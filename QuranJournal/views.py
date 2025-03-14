from django.shortcuts import render

def index(request):
    return render(request, 'homepage.html')

def search_list(request):
    return render(request, 'search&list.html')

def notes(request, surah_name):
    context = {'surah_name': surah_name}
    return render(request, 'notes.html', context)

def surah_detail(request, surah_number):
    return render(request, 'surah.html', {'surah_number': surah_number})




import os
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages

FILES_DIR = os.path.join(settings.BASE_DIR, 'Files')


# ✅ Papar file & borang
def file_detail(request, surah_name):
    file_name = f"{surah_name}.txt"
    file_path = os.path.join(FILES_DIR, file_name)
    ayat_completed = ""
    notes = ""

    # Kalau file wujud, baca isi
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            lines = f.readlines()
            if len(lines) >= 2:
                ayat_completed = lines[0].replace('Ayat Completed: ', '').strip()
                notes = lines[1].replace('Notes: ', '').strip()

    return render(request, 'notes.html', {
        'surah_name': surah_name,
        'ayat_completed': ayat_completed,
        'notes': notes
    })


# ✅ Create/Update file
def file_save(request, surah_name):
    if request.method == 'POST':
        file_name = f"{surah_name}.txt"
        ayat_completed = request.POST['ayat_completed']
        notes = request.POST['notes']

        content = f"Ayat Completed: {ayat_completed}\nNotes: {notes}"

        with open(os.path.join(FILES_DIR, file_name), 'w') as f:
            f.write(content)
        
        messages.success(request, 'File saved successfully!')
    return redirect('file_detail', surah_name=surah_name)


# ✅ Delete file
def file_delete(request, surah_name):
    file_name = f"{surah_name}.txt"
    file_path = os.path.join(FILES_DIR, file_name)

    if os.path.exists(file_path):
        os.remove(file_path)
        messages.success(request, 'File deleted successfully!')
    else:
        messages.error(request, 'File does not exist!')

    return redirect('search_list')


# View Waktu Solat
def waktu_solat(request):
    return render(request, 'waktu_solat.html')  # Template waktu solat


