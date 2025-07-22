# Prompts

## Dashboard

Genera un proyecto en react con el nombre de doculegal.

La primera pagina debe ser la del login, donde se requiere ingresar nombre de usuario y contraseña. De resto puedes agregar lo necesario visualmente.

La segunda pagina es "main" donde deberia tener un estilo de dashboard (toolbar, menu y espacio donde se carguen las subpaginas). El menu deberia tener los modulos de Documentos y Categorias, en algun lado, el boton de perfil y cerrar sesion.

La tercera pagina deberia ser la del perfil del usuario, donde puede cambiar su contraseña.

La cuarta pagina es la de "documents" donde se van a listar los documentos actuales con estas columnas en la tabla (titulo, categoria, tipo y botones de modificar y eliminar). tambien una parte de filtros y un boton para crear nuevo documento.

La quinta es para crear o modificar un documento, donde se solicitan estos campos:
- Titulo, input text
- Categoria, select, estas opciones se cargaran luego
- Prompt, textarea
- Tipo, select con 2 opciones (gratis o pago)
- Formulario, este deberia ser un componente donde se pueda generar un formulario dinamico que tenga estos campos:
{
type: text, area, select, radio, check, date, number, email
label: texto a mostrar en el label
name: nombre del campo
 required: si es requerido o no
  placeholder: placeholder
options: arreglo de (label, value) para los select, radio, check
}
y genere un arreglo con todos esos campos. 

La sexta es un crud para Categorias , donde lo que se solicita y se lista es el nombre de la misma.

Despues de hacer login el primer modulo que se debe cargar dentro del dashboard es el de documentos.

No es necesario que implementes el API para la conexion con el servidor.


