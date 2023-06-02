from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

class IsAdministrator(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'AD'

class IsAdminRef(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'AR'
    
class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'TE'

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'ST'
