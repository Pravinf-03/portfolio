from rest_framework import serializers
from .models import PersonalInfo, WorkExperience, Skill, Education, Project

# Serializes each model to JSON for the frontend
class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'

class WorkExperienceSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField()
    period = serializers.SerializerMethodField()

    class Meta:
        model = WorkExperience
        fields = '__all__'

    def get_period(self, obj):
        start = obj.start_date.strftime("%b %Y") if obj.start_date else "N/A"
        end = obj.end_date.strftime("%b %Y") if obj.end_date else "Present"
        return f"{start} - {end}"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tags = SkillSerializer(many=True, read_only=True)  # Use nested serializer
    class Meta:
        model = Project
        fields = '__all__'
