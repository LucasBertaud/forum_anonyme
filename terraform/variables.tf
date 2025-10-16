variable "instance_type" {
  description = "Type d'instance EC2 à utiliser"
  type        = string
  default     = "t2.nano"
}

variable "db_instance_type" {
  description = "Type d'instance EC2 à utiliser pour la base de données"
  type        = string
  default     = "t2.micro"
}

variable "nginx_instance_name" {
  description = "Nom de l'instance EC2 Nginx"
  type        = string
  default     = "lucas-bertaud-nginx-server"
}

variable "database_instance_name" {
  description = "Nom de l'instance EC2 base de données"
  type        = string
  default     = "lucas-bertaud-database-server"
}

# variable "bucket_name" {
#   description = "Nom du bucket S3"
#   type        = string
#   default     = "lbertaud-tp-bucket-s3"
# }

variable "security_group_port" {
  description = "Port à ouvrir dans le groupe de sécurité"
  type        = number
  default     = 80
}

variable "security_group_name" {
  description = "Nom du security group"
  type        = string
  default     = "lucas-bertaud-nginx-sg"
}

variable "aws_key_pair_name" {
  description = "Nom de la clef aws"
  type        = string
  default     = "lucas-bertaud-deployer-key"
}

variable "repo_url" {
  description = "L'url du repo github"
  type        = string
  default     = "https://github.com/LucasBertaud/forum_anonyme.git"
}

variable "thread_instance_name" {
  description = "Nom de l'instance EC2 Thread"
  type        = string
  default     = "lucas-bertaud-thread-server"
}

variable "api_instance_name" {
  description = "Nom de l'instance EC2 API"
  type        = string
  default     = "lucas-bertaud-api-server"
}

variable "sender_instance_name" {
  description = "Nom de l'instance EC2 Sender"
  type        = string
  default     = "lucas-bertaud-sender-server"
}

variable "docker_image_thread" {
  description = "Image Docker pour le service Thread"
  type        = string
  default     = "forum_anonyme-thread:latest"
}

variable "docker_image_api" {
  description = "Image Docker pour le service API"
  type        = string
  default     = "forum_anonyme-api:latest"
}

variable "docker_image_sender" {
  description = "Image Docker pour le service Sender"
  type        = string
  default     = "forum_anonyme-sender:latest"
}

variable "mysql_instance_name" {
  description = "Nom de l'instance EC2 MySQL"
  type        = string
  default     = "lucas-bertaud-mysql-server"
}