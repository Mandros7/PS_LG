# Ejercicio 1 

Se han creado dos funciones:
- sum_divisors. Calcula el sumatorio de los divisores propios de un numero. 
	- Genera la lista de divisores por pares (divisor y resultado de la division exacta) parando la búsqueda una vez se alcanza la raiz del numero en cuestión. 
	- Se ha decidido calcular la raiz (en vez de comparar cuadrados) para evitar coste computacional en las iteraciones de cada divisor en numeros grandes
- classify_numbers. Recibe una lista de numeros enteros y muestra por salida si son abundantes, perfectos o defectivos.
	- Existe la opción de guardar en memoria el resultado para un número durante la ejecución y utilizar éste en vez de realizar el cálculo de nuevo en duplicados.

Para ejecutar el código. Opciones:
- Abrir intérprete de Python (2.7.x) e importar classifynumbers
- Ejecutar main.py
- Opcional: lanzar tests sobre la función sum_divisors.

# Ejercicio 2

Librerias utilizadas (vienen en la carpeta "js"):
- D3.js

Opciones para visualizar el resultado:
- Servidor estático. Por ejemplo (Python 2.7):
`cd Ejercicio2; python -m SimpleHTTPServer`
- Visitar la versión on-line: 
http://safe-atoll-98891.herokuapp.com/vis/ejercicio2.html
