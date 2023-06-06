from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer
from .permissions import IsAdministrator, IsAdminRef, IsStudent, IsTeacher
from .mixins import PermissionPolicyMixin

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    permission_classes = [IsAuthenticated & (IsAdministrator | IsAdminRef | IsStudent)]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdministrator | IsAdminRef)],
        "retrieve": [IsAuthenticated & (IsAdministrator | IsAdminRef)]
    }
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role')
        group_id = self.request.query_params.get('group_id')
        if group_id is not None:
            queryset = User.objects.filter(group_id=group_id)
        if role is not None:
            queryset = User.objects.filter(role=role)

        return queryset


class GroupViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    """
    A viewset for viewing and editing group instances.
    """
    permission_classes = [IsAuthenticated & (IsAdministrator | IsAdminRef)]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher | IsStudent)],
        "retrieve": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher)]
    }

    serializer_class = GroupSerializer
    def get_queryset(self):
        queryset = Group.objects.all()
        is_active = self.request.query_params.get('is_active')
        student_id = self.request.query_params.get('student')
        courses = self.request.query_params.get('courses')
        referent = self.request.query_params.get('referent')
        if is_active=="true":
            queryset = queryset.filter(is_active=True)
        if is_active=="false":
            queryset = queryset.filter(is_active=False)
        if student_id is not None :
            queryset = queryset.filter(students__in=[student_id])
        if courses is not None:
            queryset = queryset.filter(modules__courses__in=courses)
        if referent is not None:
            queryset = queryset.filter(referent=referent)
        return queryset
    

class CommentViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    """
    A viewset for viewing and editing comment instances.
    """
    permission_classes = [IsAuthenticated & IsAdminRef]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdminRef | IsStudent)],
        "retrieve": [IsAuthenticated & (IsAdminRef | IsStudent)]
    }
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        queryset = Comment.objects.all()
        student_id = self.request.query_params.get('student')
        group_id = self.request.query_params.get('group')
        if student_id is not None and group_id is not None:
            queryset = Comment.objects.filter(student_id=student_id, group_id=group_id)
        return queryset


class ModuleViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    """
    A viewset for viewing and editing modules instances.
    """
    permission_classes = [IsAuthenticated & (IsAdministrator | IsAdminRef)]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher)],
        "retrieve": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher)]
    }

    serializer_class = ModuleSerializer
    def get_queryset(self):
        queryset = Module.objects.all()
        group_id=self.request.query_params.get('group')
        if group_id is not None:
            queryset = Module.objects.filter(groups__in=[group_id])
        return queryset


class CourseViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    """
    A viewset for viewing and editing courses instances.
    """
    permission_classes = [IsAuthenticated & (IsAdministrator | IsAdminRef)]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher)],
        "retrieve": [IsAuthenticated & (IsAdministrator | IsAdminRef | IsTeacher)]
    }

    serializer_class = CourseSerializer
    def get_queryset(self):
        queryset = Course.objects.all()
        teacher_id = self.request.query_params.get('teacher')
        if teacher_id is not None:
            queryset = Course.objects.filter(Q(other_teachers__in=[teacher_id]) | Q(lead_teacher=teacher_id))
        return queryset


class GradeViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    """
    A viewset for viewing and editing grades instances.
    """
    permission_classes = [IsAuthenticated & (IsAdminRef | IsTeacher)]
    permission_classes_per_method = {
        "list": [IsAuthenticated & (IsAdminRef | IsTeacher | IsStudent)],
        "retrieve": [IsAuthenticated & (IsAdminRef | IsTeacher| IsStudent)]
    }

    serializer_class = GradeSerializer
    
    def get_queryset(self):
        student_id = self.request.query_params.get('student')
        group_id = self.request.query_params.get('group')
        course_id = self.request.query_params.get('course')
        queryset = Grade.objects.all()
        if course_id is not None and group_id is not None:
            queryset = Grade.objects.filter(group_id=group_id, course_id=course_id)
        if student_id is not None:
            queryset = Grade.objects.filter(student=student_id)
        return queryset
    