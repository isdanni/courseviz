from django.db import models
from django.forms import ModelForm
from account.models import UserProfile
from django.utils import timezone

# Create your models here.


class Category(models.Model):
	name= models.CharField(max_length=20)
	cover=models.ImageField(default="img/avatar/default/user-default.jpg")

	def __str__(self):
		return self.name


class Problem(models.Model):
	name= models.CharField(max_length=20)
	description = models.TextField()
	solution = models.TextField() 
	category = models.ForeignKey(Category, on_delete = models.CASCADE)

	def __str__(self):
		return self.name


class CodeHistory(models.Model):
	created_date = models.DateTimeField(default=timezone.now)
	last_modified = models.DateTimeField(auto_now=True)
	content= models.TextField() 
	# relationship with other models
	userprofile= models.ForeignKey(UserProfile, on_delete = models.CASCADE)
	problem= models.ForeignKey(Problem, on_delete = models.CASCADE)