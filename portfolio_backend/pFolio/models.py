from django.db import models
from django.contrib.postgres.fields import JSONField
from cloudinary_storage.storage import MediaCloudinaryStorage
from datetime import date

# Model for storing basic user profile
class PersonalInfo(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    email = models.EmailField()
    bio = models.TextField()
    profile_photo = models.ImageField(storage=MediaCloudinaryStorage(), upload_to='profile_photos/')

class WorkExperience(models.Model):
    role = models.CharField(max_length=100, blank=True, null=True)   # title
    company = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)  # null for "Present"
    description = models.TextField(blank=True, null=True)
    # Store as JSON (requires PostgreSQL JSONField or Django 3.1+)
    technologies = models.JSONField(default=list, blank=True, null=True)  
    # Achievements as JSON list (or separate model if you want more control)
    achievements = models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return f"{self.role or 'Unknown Role'} at {self.company or 'Unknown Company'}"

    @property
    def duration(self):
        """Calculate duration in years/months dynamically."""
        if not self.start_date:
            return None
        end = self.end_date or date.today()
        diff = end.year - self.start_date.year - (
            (end.month, end.day) < (self.start_date.month, self.start_date.day)
        )
        return f"{diff} year(s)"


class Skill(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    year = models.CharField(max_length=10)

    def __str__(self):
        return self.degree

class Project(models.Model):
    title = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    technologies = models.TextField(null=True)
    highlight = models.CharField(max_length=150, blank=True, null=True)
    repo_link = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    image = models.ImageField(storage=MediaCloudinaryStorage(), upload_to='project_images', blank=True, null=True)
    project_type = models.CharField(
        max_length=50,
        choices=[('web','Web'), ('mobile','Mobile'), ('desktop','Desktop'), ('other','Other')],
        default='web'
    )
    status = models.CharField(
        max_length=50,
        choices=[('completed','Completed'), ('in_progress','In Progress'), ('planned','Planned')],
        default='completed'
    )
    start_date = models.DateField(null=True)
    end_date = models.DateField(blank=True, null=True)
    tags = models.ManyToManyField('Skill', blank=True)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title