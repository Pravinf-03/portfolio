from django.db import models

# Model for storing basic user profile
class PersonalInfo(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    email = models.EmailField()
    bio = models.TextField()
    profile_photo = models.ImageField(upload_to='profile_photos/')

class WorkExperience(models.Model):
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    technologies = models.TextField()
    description = models.TextField()

class Skill(models.Model):
    name = models.CharField(max_length=50)

class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    year = models.CharField(max_length=10)

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    technologies = models.TextField()
    repo_link = models.URLField(blank=True, null=True)
