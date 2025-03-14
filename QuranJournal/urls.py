from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search-list/', views.search_list, name='search_list'),
    path('notes/<str:surah_name>/', views.notes, name='notes'),
    path('surah/<int:surah_number>/', views.surah_detail, name='surah_detail'),  # ✅ WAJIB ADA
    path('file/detail/<str:surah_name>/', views.file_detail, name='file_detail'),  # Read
    path('muslim/file/save/<str:surah_name>/', views.file_save, name='file_save'),       # Save
    path('muslim/file/delete/<str:surah_name>/', views.file_delete, name='file_delete'), # Delete
    path('waktu-solat/', views.waktu_solat, name='waktu_solat'),
    
]
