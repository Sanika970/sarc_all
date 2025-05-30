from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title




# everytime you make changes in models.py you make migrations.



# Create your models here.
# to tell what kind of data yur website will store