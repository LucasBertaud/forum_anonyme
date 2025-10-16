# # Create an S3 bucket
# resource "aws_s3_bucket" "lucas_bertaud_bucket" {
#   bucket = var.bucket_name
# }

# # Enable versioning for the bucket
# resource "aws_s3_bucket_versioning" "lucas_bertaud_bucket_versioning" {
#   bucket = aws_s3_bucket.lucas_bertaud_bucket.id

#   versioning_configuration {
#     status = "Enabled"
#   }
# }

# # Upload a file to the bucket
# resource "aws_s3_object" "lucas_bertaud_object" {
#   bucket = aws_s3_bucket.lucas_bertaud_bucket.id
#   key    = "hello-world.txt"
#   source = "./test-file.txt"
#   etag   = filemd5("./test-file.txt")
# }

# resource "aws_s3_bucket_public_access_block" "lucas_bertaud_bucket_public_access" {
#   bucket = aws_s3_bucket.lucas_bertaud_bucket.id

#   block_public_acls   = false
#   block_public_policy = false
# }

# resource "aws_s3_bucket_policy" "public_policy" {
#   bucket = aws_s3_bucket.lucas_bertaud_bucket.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Sid       = "PublicReadGetObject"
#         Effect    = "Allow"
#         Principal = "*"
#         Action    = ["s3:GetObject"]
#         Resource  = ["${aws_s3_bucket.lucas_bertaud_bucket.arn}/*"]
#       }
#     ]
#   })
# }
