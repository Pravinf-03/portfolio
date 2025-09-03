from django.contrib import admin
from .models import PersonalInfo, WorkExperience, Skill, Education, Project

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ("fname", "lname", "email", "contact")

@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date")

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "year")

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "technologies", "repo_link")
