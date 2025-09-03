from django.urls import path
from .views import (
    PersonalInfoList, WorkExperienceList, SkillList, EducationList, ProjectList
)

urlpatterns = [
    path('personal-info/', PersonalInfoList.as_view()),
    path('work-experience/', WorkExperienceList.as_view()),
    path('skills/', SkillList.as_view()),
    path('education/', EducationList.as_view()),
    path('projects/', ProjectList.as_view()),
]
