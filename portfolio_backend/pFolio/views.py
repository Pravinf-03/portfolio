from rest_framework import generics
from .models import PersonalInfo, WorkExperience, Skill, Education, Project
from .serializers import PersonalInfoSerializer, WorkExperienceSerializer,SkillSerializer, EducationSerializer, ProjectSerializer

# API endpoints: List all items (GET), add new (POST)
class PersonalInfoList(generics.ListAPIView):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer

class WorkExperienceList(generics.ListAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer

class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class EducationList(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
