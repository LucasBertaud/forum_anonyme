# Generate SSH key
resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Create key pair
resource "aws_key_pair" "deployer" {
  key_name   = var.aws_key_pair_name
  public_key = tls_private_key.key.public_key_openssh
}

# Store private key locally
resource "local_file" "private_key" {
  content         = tls_private_key.key.private_key_pem
  filename        = "${path.module}/${var.aws_key_pair_name}.pem"
  file_permission = "0600"
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Create EC2 instance for Thread service
resource "aws_instance" "thread" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = var.instance_type
  security_groups = [aws_security_group.thread_sg.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              
              # Install Docker
              amazon-linux-extras install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              
              # Install git
              yum install git -y
              
              # Clone repository
              cd /home/ec2-user
              git clone ${var.repo_url}
              chown -R ec2-user:ec2-user forum_anonyme
              
              # Build and run Thread Docker image
              cd forum_anonyme/thread
              sed -i "s|localhost:3000|${aws_instance.api.public_ip}:3000|g" index.html
              docker build -t ${var.docker_image_thread} -f ./Dockerfile .
              docker run -d -p 80:80 --name thread-service ${var.docker_image_thread}
              EOF

  tags = {
    Name    = var.thread_instance_name
    Service = "thread"
  }
}

# Create EC2 instance for API service
resource "aws_instance" "api" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = var.instance_type
  security_groups = [aws_security_group.api_sg.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              
              # Install Docker
              amazon-linux-extras install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              
              # Install git
              yum install git -y
              
              # Clone repository
              cd /home/ec2-user
              git clone ${var.repo_url}
              chown -R ec2-user:ec2-user forum_anonyme
              
              # Build and run API Docker image
              cd forum_anonyme/api
              docker build -t ${var.docker_image_api} -f ./Dockerfile .
              docker run -d -p 3000:3000 \
                -e DB_HOST=${aws_instance.mysql.public_ip} \
                -e DB_PORT=3306 \
                -e DB_USERNAME=root \
                -e DB_PASSWORD=root \
                -e DB_NAME=forum_anonyme \
                --name api-service ${var.docker_image_api}
              EOF

  depends_on = [aws_instance.mysql]

  tags = {
    Name    = var.api_instance_name
    Service = "api"
  }
}

# Create EC2 instance for Sender service
resource "aws_instance" "sender" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = var.instance_type
  security_groups = [aws_security_group.sender_sg.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              
              # Install Docker
              amazon-linux-extras install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              
              # Install git
              yum install git -y
              
              # Clone repository
              cd /home/ec2-user
              git clone ${var.repo_url}
              chown -R ec2-user:ec2-user forum_anonyme
              
              # Build and run Sender Docker image
              cd forum_anonyme/sender
              sed -i "s|localhost:3000|${aws_instance.api.public_ip}:3000|g" script.js
              sed -i "s|localhost:3000|${aws_instance.api.public_ip}:3000|g" index.html
              docker build -t ${var.docker_image_sender} -f ./Dockerfile .
              docker run -d -p 80:80 --name sender-service ${var.docker_image_sender}
              EOF

  tags = {
    Name    = var.sender_instance_name
    Service = "sender"
  }
}

# Create EC2 instance for MySQL database
resource "aws_instance" "mysql" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = var.db_instance_type
  security_groups = [aws_security_group.mysql_sg.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              
              # Install Docker
              amazon-linux-extras install docker -y
              systemctl start docker
              systemctl enable docker
              usermod -a -G docker ec2-user
              
              # Run MySQL Docker container
              docker run -d \
                --name mysql-service \
                -e MYSQL_ROOT_PASSWORD=root \
                -e MYSQL_DATABASE=forum_anonyme \
                -p 3306:3306 \
                -v mysql_data:/var/lib/mysql \
                mysql:8
              EOF

  tags = {
    Name    = var.mysql_instance_name
    Service = "mysql"
  }
}
