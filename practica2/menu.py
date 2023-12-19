import subprocess
import os
from datetime import datetime
import shlex
import pymysql
def iniciarSesion():
    user=''
    password=''
    print("******************** INICIO DE SESIÓN ***********************")
    print("Ingrese Usuario:")
    user = input(": ")
    print("Ingrese Password:")
    password = input(": ")

    if user=="Sergio" and password=="12345":
        acciones()
    else:
        print("Credenciales Incorrectas")

def acciones():
    print("*******************BIENVENIDO USUARIO*******************")
    print("1.Consultas\n2.Actualizar Registros\n3.Agregar Registros\n4.Eliminar Registros\n5.Realizar Respaldo Completo\n6.Ver Respaldos Realizados",
          "\n7.Restaurar Respaldo")
    #respaldoCompleto()
    #mostrarBackups()
    #restaurarRespaldo()
    #creacionUsuarios()


    
def respaldoCompleto():
    try:
        print("Realizar Respaldo Completo")

        # Obtener la fecha y hora actual en el formato (DD-MM-YYYY HH-MM-SS)
        fecha_hora_actual = datetime.now().strftime("%d-%m-%Y %H-%M-%S")

        # Construir el nombre del archivo de respaldo con la fecha y hora
        nombre = f"backup_{fecha_hora_actual}.sql"

        # Construir el comando de respaldo completo
        comandoBckFull = f'mysqldump -u root -p db_practica2 | Out-File -FilePath "{nombre}" -Encoding UTF8'

        # Ejecutar el comando
        proccess = subprocess.Popen(['powershell', 'measure-command', f'{{{comandoBckFull}}}'], shell=True)
        proccess.wait()

        print("Backup Realizado correctamente")

        connection = pymysql.connect(
            host="localhost",
            user="root",
            passwd="passWord_10",
            database="db_practica2"
        )
        with connection.cursor() as cursor:
            insert = "INSERT INTO backups(nombre) VALUES(%s)";
            cursor.execute(insert,(nombre,))
        connection.commit()
        connection.close()

    except Exception as e:
        print(f"Error al realizar el backup completo: {e}")

# Llamar a la función para realizar el respaldo
#respaldoCompleto()
        

def mostrarBackups():
    try:
        # Conectar a MySQL y realizar la consulta en la tabla 'backups'
        connection = pymysql.connect(
            host="localhost",
            user="root",
            passwd="passWord_10",
            database="db_practica2",
            cursorclass=pymysql.cursors.DictCursor
        )

        with connection.cursor() as cursor:
            # Realizar la consulta en la tabla 'backups'
            consulta = "SELECT idBackup, nombre FROM backups"
            cursor.execute(consulta)
            resultados = cursor.fetchall()

            # Mostrar los backups con sus identificadores y nombres
            for resultado in resultados:
                print(f"ID: {resultado['idBackup']}, Nombre: {resultado['nombre']}")

        # Cerrar la conexión
        connection.close()

    except Exception as e:
        print(f"Error al mostrar los backups: {e}")


def restaurarRespaldo():
    try:
        print("Realizar Restauración completa")
        mostrarBackups()
        idBackup = input("Ingrese el ID del backup a restaurar: ")
        #nombre = input("Ingrese el id del backup a restaurar: ")

        connection = pymysql.connect(
            host="localhost",
            user="root",
            passwd="passWord_10",
            database="db_practica2"
        )
        with connection.cursor() as cursor:
            # Realizar la consulta para obtener el nombre del archivo
            consulta = "SELECT nombre FROM backups WHERE idBackup = %s"
            cursor.execute(consulta, (idBackup,))
            resultado = cursor.fetchone()

            if resultado:
                nombre_archivo = resultado['nombre']

                # Obtener la ruta completa al archivo de respaldo
                ruta_completa = shlex.quote(nombre_archivo)

                # Construir el comando para restaurar
                comando_restore = f'mysql -u root -p db_practica2 < {ruta_completa}'

                print(comando_restore)

                # Ejecutar el comando directamente con subprocess.run
                subprocess.run(comando_restore, shell=True)

                print("Restauración completada correctamente")
            else:
                print("No se encontró el backup con el ID proporcionado.")

        # Cerrar la conexión
        connection.close()

    except Exception as e:
        print(f"Error al realizar la restauración del Backup completo: {e}")
       

    

#MENU PRINCIPAL
"""option = 0
while(option!=3):
    print("********************CLI HOSPITAL BIENVENIDO*******************")
    print("1.Iniciar Sesión")
    print("2.Registrar un Nuevo Usuario")
    print("3.Salir")
    option = int(input("Ingrese la opción: "))
    if option==1:
        iniciarSesion();
    if option==2:
        print("2.Registrar un nuevo usuario")
    if option==3:
        print("3.Salir")"""
acciones()









