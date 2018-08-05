from django.db import models
from django.utils import timezone

# Create your models here.

class UserProfile(models.Model):
	# user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
	userid = models.CharField(max_length=100)
	email= models.EmailField()
	created_date = models.DateTimeField(default=timezone.now)
	last_modified = models.DateTimeField(auto_now=True)
	description = models.TextField()

	def code_history():
		return self.__str__

	def publish(self):
		self.created_date = timezone.now()
		self.save()

	def __str__(self):
		return self.user