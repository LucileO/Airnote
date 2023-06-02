# Generated by Django 3.2.18 on 2023-06-02 16:01

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=128, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('role', models.CharField(choices=[('AD', 'Administrator'), ('AR', 'Administrator Referent'), ('TE', 'Teacher'), ('ST', 'Student')], max_length=2)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('lead_teacher', models.ForeignKey(limit_choices_to={'role': 'TE'}, on_delete=django.db.models.deletion.PROTECT, related_name='lead_teacher', to=settings.AUTH_USER_MODEL)),
                ('other_teachers', models.ManyToManyField(blank=True, default=[], limit_choices_to={'role': 'TE'}, related_name='teachers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('courses', models.ManyToManyField(blank=True, default=[], related_name='courses', to='backend.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(choices=[('M2', 'Master 2'), ('M1', 'Master 1'), ('L3', 'Licence')], max_length=2)),
                ('name', models.CharField(max_length=20)),
                ('year', models.CharField(max_length=9)),
                ('is_active', models.BooleanField(default=True)),
                ('delegates', models.ManyToManyField(blank=True, default=[], limit_choices_to={'role': 'ST'}, related_name='delegates', to=settings.AUTH_USER_MODEL)),
                ('modules', models.ManyToManyField(blank=True, default=[], related_name='modules', to='backend.Module')),
                ('referent', models.ForeignKey(blank=True, limit_choices_to={'role': 'AR'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='referent', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(blank=True, default=[], limit_choices_to={'role': 'ST'}, related_name='students', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('level', 'name', 'year')},
            },
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(25)])),
                ('comment', models.CharField(blank=True, max_length=200, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.course')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.group')),
                ('student', models.ForeignKey(limit_choices_to={'role': 'ST'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('student', 'group', 'course')},
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(blank=True, max_length=200, null=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.group')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('student', 'group')},
            },
        ),
    ]