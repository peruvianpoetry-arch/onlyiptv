import os
import json
import shutil

def cargar_modelos(path='modelos.json'):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def guardar_modelos(modelos, path='modelos.json'):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(modelos, f, indent=4, ensure_ascii=False)

def obtener_siguiente_numero(carpeta):
    archivos = os.listdir(carpeta)
    numeros = [int(a.split()[1].split('.')[0]) for a in archivos if a.endswith('.mp4') and ' ' in a and a.split()[1].split('.')[0].isdigit()]
    return max(numeros + [0]) + 1

def procesar_video(video_path, modelos):
    print(f"Procesando: {video_path}")
    nombre_modelo = input("Nombre del modelo: ").strip()
    pais = input("País del modelo: ").strip()
    edad = input("Edad (opcional): ").strip()

    carpeta_destino = os.path.join("videos", pais, nombre_modelo)
    os.makedirs(carpeta_destino, exist_ok=True)

    num_video = obtener_siguiente_numero(carpeta_destino)
    nuevo_nombre = f"{nombre_modelo} {num_video}.mp4"
    destino = os.path.join(carpeta_destino, nuevo_nombre)
    shutil.move(video_path, destino)

    existe = False
    for modelo in modelos:
        if modelo['nombre'] == nombre_modelo and modelo['pais'] == pais:
            existe = True
            break
    if not existe:
        modelos.append({'nombre': nombre_modelo, 'pais': pais, 'edad': edad})

    m3u_path = os.path.join(carpeta_destino, f"{nombre_modelo}.m3u")
    with open(m3u_path, 'a', encoding='utf-8') as f:
        f.write(f"{nuevo_nombre}\n")

    print(f"✅ Guardado en: {destino}")

def main():
    modelos = cargar_modelos()
    carpeta_videos = "nuevos_videos"
    videos = [f for f in os.listdir(carpeta_videos) if f.endswith(".mp4")]

    if not videos:
        print("No hay videos nuevos.")
        return

    for video in videos:
        procesar_video(os.path.join(carpeta_videos, video), modelos)

    guardar_modelos(modelos)
    print("✅ Todos los videos procesados y modelos actualizados.")

if __name__ == "__main__":
    main()
