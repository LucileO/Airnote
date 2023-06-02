from backend.models import User, Comment, Group, Module, Grade, Course
from rest_framework import serializers
from collections import OrderedDict
# Create your models here.


class RefField(serializers.PrimaryKeyRelatedField):
    def __init__(self, model, serializer, **kwargs):
        super().__init__(**kwargs)
        self.model = model
        self.serializer = serializer

    def to_representation(self, value):
        return self.serializer(value).data

    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.model.objects.all()

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}
        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([
            (
                item.pk,
                self.display_value(item)
            )
            for item in queryset
        ])

    def use_pk_only_optimization(self):
        pass


class UserSerializer(serializers.ModelSerializer):
    # TODO Validation doit échouer si role pas dans les choices

    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate_username(self, value):
        if not User.objects.filter(username=value).exists():
            raise serializers.ValidationError('User does not exist.')
        return value



class CourseSerializer(serializers.ModelSerializer):
    lead_teacher = RefField(model=User, serializer=UserSerializer,
                            required=False, allow_null=True)
    other_teachers = RefField(model=User, serializer=UserSerializer, many=True)

    class Meta:
        model = Course
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    courses = RefField(model=Course, serializer=CourseSerializer, many=True)

    class Meta:
        model = Module
        fields = '__all__'
        
class GroupSerializer(serializers.ModelSerializer):
    referent = RefField(model=User, serializer=UserSerializer,
                        required=False, allow_null=True)
    delegates = RefField(model=User, serializer=UserSerializer,
                         required=False, many=True)
    students = RefField(model=User, serializer=UserSerializer,
                        required=False, many=True)
    modules = RefField(model=Module, serializer=ModuleSerializer, required=False, many=True)

    class Meta:
        model = Group
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    student = RefField(model=User, serializer=UserSerializer,
                        required=False, allow_null=False)
    group = RefField(model=Group, serializer=GroupSerializer,
                        required=True, allow_null=False)
    class Meta:
        model = Comment
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    student = RefField(model=User, serializer=UserSerializer,
                       required=True, allow_null=False)
    course = RefField(model=Course, serializer=CourseSerializer,
                       required=True, allow_null=False)
    group = RefField(model=Group, serializer=GroupSerializer,
                       required=True, allow_null=False)

    class Meta:
        model = Grade
        fields = '__all__'
