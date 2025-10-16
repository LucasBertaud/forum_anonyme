output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i deployer-key.pem ec2-user@${aws_instance.api.public_ip}"
}

# output "bucket_id" {
#   description = "ID of the S3 bucket"
#   value       = aws_s3_bucket.lucas_bertaud_bucket.id
# }

# Thread service outputs
output "thread_instance_id" {
  description = "ID of the Thread EC2 instance"
  value       = aws_instance.thread.id
}

output "thread_instance_public_ip" {
  description = "Public IP of the Thread EC2 instance"
  value       = aws_instance.thread.public_ip
}

output "thread_ssh_command" {
  description = "SSH command to connect to the Thread instance"
  value       = "ssh -i ${var.aws_key_pair_name}.pem ec2-user@${aws_instance.thread.public_ip}"
}

output "thread_service_url" {
  description = "URL to access Thread service"
  value       = "http://${aws_instance.thread.public_ip}"
}

# API service outputs
output "api_instance_id" {
  description = "ID of the API EC2 instance"
  value       = aws_instance.api.id
}

output "api_instance_public_ip" {
  description = "Public IP of the API EC2 instance"
  value       = aws_instance.api.public_ip
}

output "api_ssh_command" {
  description = "SSH command to connect to the API instance"
  value       = "ssh -i ${var.aws_key_pair_name}.pem ec2-user@${aws_instance.api.public_ip}"
}

output "api_service_url" {
  description = "URL to access API service"
  value       = "http://${aws_instance.api.public_ip}"
}

# Sender service outputs
output "sender_instance_id" {
  description = "ID of the Sender EC2 instance"
  value       = aws_instance.sender.id
}

output "sender_instance_public_ip" {
  description = "Public IP of the Sender EC2 instance"
  value       = aws_instance.sender.public_ip
}

output "sender_ssh_command" {
  description = "SSH command to connect to the Sender instance"
  value       = "ssh -i ${var.aws_key_pair_name}.pem ec2-user@${aws_instance.sender.public_ip}"
}

output "sender_service_url" {
  description = "URL to access Sender service"
  value       = "http://${aws_instance.sender.public_ip}"
}

output "mysql_instance_id" {
  description = "ID of the MySQL EC2 instance"
  value       = aws_instance.mysql.id
}

output "mysql_instance_public_ip" {
  description = "Public IP of the MySQL EC2 instance"
  value       = aws_instance.mysql.public_ip
}

output "mysql_ssh_command" {
  description = "SSH command to connect to the MySQL instance"
  value       = "ssh -i ${var.aws_key_pair_name}.pem ec2-user@${aws_instance.mysql.public_ip}"
}
