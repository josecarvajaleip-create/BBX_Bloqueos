// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar notificación de éxito
        showNotification('Texto copiado');
    }).catch(err => {
        // Mostrar notificación de error
        showNotification('Error al copiar: ' + err, true);
    });
}

// Función para mostrar notificaciones
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    document.body.appendChild(notification);

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Eventos para los botones de consultas
document.getElementById('btn-sudo-gca').addEventListener('click', () => copyToClipboard('sudo su postgres'));
document.getElementById('btn-bbdd-gca').addEventListener('click', () => copyToClipboard('psql produccion_lpa'));
document.getElementById('btn-consulta-gca').addEventListener('click', () => copyToClipboard("SELECT bl.pid AS blocked_pid, kl.pid AS blocking_pid, a.query AS query_blocked, ka.query AS query_blocking, bl.transactionid, kl.granted, a.query_start FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid ORDER BY a.query_start;"));

// document.getElementById('btn-sudo-pmi').addEventListener('click', () => copyToClipboard('sudo su postgres'));
document.getElementById('btn-bbdd-pmi').addEventListener('click', () => copyToClipboard('psql produccion_pmi'));
// document.getElementById('btn-consulta-pmi').addEventListener('click', () => copyToClipboard('select blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;'));

// document.getElementById('btn-sudo-tfe').addEventListener('click', () => copyToClipboard('sudo su postgres'));
document.getElementById('btn-bbdd-tfe').addEventListener('click', () => copyToClipboard('psql produccion_tfe'));
// document.getElementById('btn-consulta-tfe').addEventListener('click', () => copyToClipboard('select blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;'));

// document.getElementById('btn-sudo-lza').addEventListener('click', () => copyToClipboard('sudo su postgres'));
document.getElementById('btn-bbdd-lza').addEventListener('click', () => copyToClipboard('psql produccion_lza'));
// document.getElementById('btn-consulta-lza').addEventListener('click', () => copyToClipboard('select blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;'));


document.getElementById('btn-val').addEventListener('click', () => copyToClipboard('sudo su postgres\npsql produccion_val\nselect blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;\n'));

// document.getElementById('btn-sdq').addEventListener('click', () => copyToClipboard('sudo su postgres\npsql sd_produccion\nselect blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;\n'));
document.getElementById('btn-sdq').addEventListener('click', () => copyToClipboard('psql sd_produccion'));

// document.getElementById('btn-pur').addEventListener('click', () => copyToClipboard('sudo su postgres\npsql produccion_pr\nselect blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;\n'));

document.getElementById('btn-pur').addEventListener('click', () => copyToClipboard('psql produccion_pr'))
document.getElementById('btn-cau').addEventListener('click', () => copyToClipboard('sudo su postgres\npsql produccion_ca\nselect blocked_pid, blocking_pid, query_blocked from migracion.ver_bloqueos;\n'));
document.getElementById('btn-consulta-select').addEventListener('click', () => copyToClipboard("SELECT DISTINCT kl.pid AS blocking_pid, a.query_start FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query NOT IN (SELECT ka.query FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query ILIKE '%UPDATE%' OR ka.query ILIKE '%INSERT%' OR ka.query ILIKE '%comprobantefiscal%' OR ka.query ILIKE '%rangonumeroscomprobantesfiscales%' OR ka.query ILIKE '%transaccion%' OR ka.query ILIKE '%numeraciondocumentos%' OR ka.query ILIKE '%factura%') ORDER BY a.query_start;"));
document.getElementById('btn-consulta-update').addEventListener('click', () => copyToClipboard("SELECT DISTINCT kl.pid AS blocking_pid, a.query_start FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query NOT IN (SELECT ka.query FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query ILIKE '%comprobantefiscal%' OR ka.query ILIKE '%rangonumeroscomprobantesfiscales%' OR ka.query ILIKE '%transaccion%' OR ka.query ILIKE '%factura%') ORDER BY a.query_start;"));
document.getElementById('btn-consulta-especial').addEventListener('click', () => copyToClipboard("SELECT DISTINCT kl.pid AS blocking_pid, a.query_start FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query NOT IN (SELECT ka.query FROM pg_locks bl JOIN pg_stat_activity AS a ON bl.pid = a.pid JOIN pg_locks AS kl ON bl.transactionid = kl.transactionid AND bl.pid <> kl.pid JOIN pg_stat_activity AS ka ON kl.pid = ka.pid WHERE ka.query ILIKE '%comprobantefiscal%' OR ka.query ILIKE '%rangonumeroscomprobantesfiscales%' OR ka.query ILIKE '%transaccion%' OR ka.query ILIKE '%factura%') ORDER BY a.query_start;"));

// Eventos para los números telefónicos
document.querySelectorAll('.click-to-copy').forEach(element => {
    element.addEventListener('click', () => {
        const phoneNumber = element.getAttribute('data-phone-number');
        copyToClipboard(phoneNumber);
    });
});

// Redirecciones
function redirectToBloqueosPage() {
    window.open('https://bory315.github.io/bloqueos/', '_blank');
}

function redirectToSharePoint() {
    window.open('https://ikeasi.sharepoint.com/:x:/s/BITBOXCARIBESRL/IQDnsBUDTSdYQ6YgFFFL6jLRAeZpOSl7jr7eXi26j24GQXc?e=XxGvpA', '_blank');
}

function redirectToOneNote() {
    window.open('https://ikeasi.sharepoint.com/:f:/s/BITBOXCARIBESRL/IgBTn1HoTS-DT4ISrAr66FHeASepu2A5nybuxFqie7VKf3Q?e=cFhtx3', '_blank');
}

function redirectToGuardias() {
    window.open('https://ikeasi.sharepoint.com/:x:/r/sites/BITBOXCARIBESRL/_layouts/15/doc2.aspx?sourcedoc=%7B01964FEF-2ECA-4E8F-B481-5ABDDB5425BB%7D&file=Guardia%20-%20Helpdesk%20interno.xlsx&action=default&mobileredirect=true', '_blank');
}

function redirectToFacturasCorruptas() {
    window.open('http://192.168.36.168:3000/', '_blank');
}

const botonLiberarMemoria = document.getElementById('btn-liberar-memoria');
if (botonLiberarMemoria) {
    botonLiberarMemoria.addEventListener('click', () => {
        copyToClipboard('sudo freememory.sh\n');
    });
}

// Función para alternar entre modo oscuro y claro
function toggleMode() {
    const body = document.body;
    const button = document.getElementById('mode-toggle');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        button.textContent = '☀️ Modo claro';
        localStorage.setItem('theme', 'dark');
    } else {
        button.textContent = '🌙 Modo oscuro';
        localStorage.setItem('theme', 'light');
    }
}

function generarPermiso(e) {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value;
    const referencia = form.referencia.value;
    const plataforma = form.plataforma.value;
    const acceso = form.acceso.value;

    const texto = `Hola,\nSe han asignado los permisos de ${referencia} al usuario ${nombre} en ${plataforma}.\n\nUsuario: ${nombre}\nClave: ${acceso}\n\nUn saludo.`;

    navigator.clipboard.writeText(texto).then(() => {
        const content = form.nextElementSibling;
        content.innerHTML = texto
            .replace(`Usuario: ${nombre}`, `<strong>Usuario:</strong> <strong>${nombre}</strong>`)
            .replace(`Clave: ${acceso}`, `<strong>Clave:</strong> <strong>${acceso}</strong>`);
        content.style.display = 'block';
        showNotification('Permiso generado y copiado');
    });
}

function limpiarResultado() {
  const resultado = document.getElementById('resultado-permiso');
  resultado.innerHTML = '';
  resultado.style.display = 'none';

  // Limpiar los campos del formulario
  const form = document.querySelector('.template-form');
  form.reset();

  showNotification('Formulario y resultado limpiados');
}

// Función para copiar imagen al portapapeles
async function copyImageToClipboard(imgURL) {
    const res = await fetch(imgURL);
    const blob = await res.blob();

    try {
        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        showNotification('Imagen copiada al portapapeles');
    } catch (err) {
        console.error("Error al copiar la imagen", err);
        showNotification('Error al copiar la imagen', true);
    }
}

// Mensajes predefinidos


const mensajeSinContacto = `Saludos.

Hemos intentado contactar a la Ext. pero no hemos tenido éxito.
Estaremos intentando más tarde.

Puede llamarnos a la Ext.8000 y con gusto le ayudaremos.
También nos puede hablar via Skype a Soporte Helpdesk.`


const mensajeSinSeguimiento = `Saludos.

Hemos solicitado información necesaria para poder gestionar su petición, también hemos intentado contactar en varias ocasiones con el solicitante, pero no hemos recibido respuesta alguna.

En vista de que han pasado las 48 Horas (tiempo que los colaboradores tienen disponible para responder la solicitud), procedemos a cerrar la incidencia.

De continuar con el inconveniente que reporta, por favor, enviar una nueva solicitud a HELPDESK.`;

const mensajeNoEsta = `Saludos.

Contactamos con la extensión, pero nos informan que el solicitante no está disponible.

Hemos dejado indicaciones para que se comunique con nosotros.`;

const mensajeMyLearning = `Saludos.

-Hemos realizado los cambios necesarios para que tu cuenta pueda sincronizar, solo tienes que hacer el cambio de clave en HRM. 

-Recuerda: No usar nombres propios de personas, utiliza Comida, Fruta, Países, Colores, entre otros.

-Mayúscula, un punto (.) y números (No repetidos de 3 en adelante 111 ... 123 etc).

Ejemplo: Piscina..1247*`;

const mensajePlantillaIncorrecta = `Saludos.

Las peticiones sobre asignación de permisos y creación de usuario deben ser solicitadas con la plantilla correcta,
las que llevan por nombre 'Permisos de usuario/Creación de usuario'.

Favor abrir ticket nuevamente con la plantilla correcta.`;

const mensajeP1 = `Saludos.

Hemos recibido su petición, estaremos gestionando el caso a la mayor brevedad posible, sin embargo, vemos que tiene urgencia P1 y la misma no aplica para este tipo de casos.

P1 (Muy urgente): Se refiere a incidencias que afectan de manera directa las operaciones de la empresa, por ejemplo, inconvenientes con el proceso de facturación en donde el cliente se encuentra en espera para poder finalizar su compra.`;

const mensajeP2 = `Saludos.

Hemos recibido su petición, estaremos gestionando el caso a la mayor brevedad posible, sin embargo, vemos que tiene urgencia P2 y la misma no aplica para este tipo de casos.

P2 (Urgente): Se debe de utilizar para reportar incidencias que interfieren con las operaciones de la empresa de manera parcial, en donde existen otras alternativas para mantener la operación, pero se requiere la resolución del problema a la brevedad posible.`;

const mensajeOutlook = `Debido a que el Outlook no es 100% compatible con nuestro Mailserver. es probable que se encuentre con ciertos problemas con dicha plataforma:
-Se pierden correos, desaparecen carpetas, no llegan a todos los destinatarios...etc

Pasamos a darles esta advertencia antes de proceder con la configuracion, podemos darles opciones alternativas con Thunderbird o usar la pagina de Webmail ( https://webmail.ikeasi.com/ ).

Pero si deciden usar Outlook, favor de tener en cuenta las posibles consecuencias que puedan enfrentar.

Nos dejan saber su respuesta.`;

// Asignar eventos a los botones

document.getElementById('btn-sin-contacto').addEventListener('click', () => copyToClipboard(mensajeSinContacto));
document.getElementById('btn-sin-seguimiento').addEventListener('click', () => copyToClipboard(mensajeSinSeguimiento));
document.getElementById('btn-my-learning').addEventListener('click', () => copyToClipboard(mensajeMyLearning));
document.getElementById('btn-no-disponible').addEventListener('click', () => copyToClipboard(mensajeNoEsta));
document.getElementById('btn-plantilla-incorrecta').addEventListener('click', () => copyToClipboard(mensajePlantillaIncorrecta));
document.getElementById('btn-urgencia-p1').addEventListener('click', () => copyToClipboard(mensajeP1));
document.getElementById('btn-urgencia-p2').addEventListener('click', () => copyToClipboard(mensajeP2));
document.getElementById('btn-correo-outlook').addEventListener('click', () => copyToClipboard(mensajeOutlook));

// Copiar imagen al portapapeles
document.getElementById('btn-plantilla-incorrecta-foto').addEventListener('click', () => {
  copyImageToClipboard('img/plantilla.png');
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const button = document.getElementById('mode-toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');

        if (button) {
            button.textContent = '☀️ Modo claro';
        }
    } else if (button) {
        button.textContent = '🌙 Modo oscuro';
    }
});




// Generador de consultas de desbloqueo integrado en la página principal
function mostrarGeneradorDesbloqueos() {
    const generador = document.getElementById('generador-desbloqueos');
    if (!generador) return;

    generador.hidden = false;
    generador.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('inputNumeros')?.focus(), 350);
}

function ocultarGeneradorDesbloqueos() {
    const generador = document.getElementById('generador-desbloqueos');
    if (generador) generador.hidden = true;
}

function obtenerPidsValidos() {
    const input = document.getElementById('inputNumeros');
    if (!input) return [];

    return [...new Set(
        input.value
            .split(/\r?\n/)
            .map(linea => linea.trim())
            .filter(linea => /^\d+$/.test(linea))
    )];
}

function generarQuery() {
    const pids = obtenerPidsValidos();
    const resultado = document.getElementById('resultadoQuery');
    const contador = document.getElementById('contador-pids');
    const botonCopiar = document.getElementById('btn-copiar-query');
    if (!resultado || !contador || !botonCopiar) return;

    contador.textContent = `${pids.length} ${pids.length === 1 ? 'PID' : 'PID'}`;

    if (pids.length === 0) {
        resultado.textContent = 'No se encontraron PID válidos. Coloca un número por línea.';
        botonCopiar.disabled = true;
        return;
    }

    resultado.textContent = pids
        .map(pid => `select pg_terminate_backend(${pid});`)
        .join('\n\n');
    botonCopiar.disabled = false;
}

function copiarResultado() {
    const resultado = document.getElementById('resultadoQuery');
    const botonCopiar = document.getElementById('btn-copiar-query');
    if (!resultado || !botonCopiar || botonCopiar.disabled) return;
    copyToClipboard(resultado.textContent);
}

function limpiarGenerador() {
    const input = document.getElementById('inputNumeros');
    const resultado = document.getElementById('resultadoQuery');
    const contador = document.getElementById('contador-pids');
    const botonCopiar = document.getElementById('btn-copiar-query');

    if (input) input.value = '';
    if (resultado) resultado.textContent = 'Las consultas aparecerán aquí.';
    if (contador) contador.textContent = '0 PID';
    if (botonCopiar) botonCopiar.disabled = true;
    input?.focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputNumeros');
    if (!input) return;

    input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            generarQuery();
        }
    });
});


// ===== Cuadro de bloqueos por tienda =====
// Conserva el texto original y permite alternar entre la salida de PostgreSQL
// y una presentación más legible por bloques.
document.addEventListener('DOMContentLoaded', () => {
    const campoBloqueos = document.getElementById('bloqueos-tiendas');
    const botonLimpiar = document.getElementById('btn-limpiar-bloqueos');
    const botonCopiar = document.getElementById('btn-copiar-bloqueos');
    const botonOrganizar = document.getElementById('btn-organizar-bloqueos');

    if (!campoBloqueos) return;

    let textoOriginal = '';
    let vistaOrganizada = false;

    const tiendas = {
        'btn-bbdd-gca': 'GCA',
        'btn-bbdd-pmi': 'PMI',
        'btn-bbdd-tfe': 'TFE',
        'btn-bbdd-lza': 'LZA',
        'btn-sdq': 'SDQ',
        'btn-pur': 'PUR',
        'btn-cau': 'CAU',
        'btn-val': 'VAL'
    };

    const volverAVistaOriginal = () => {
        if (!vistaOrganizada) return;
        campoBloqueos.value = textoOriginal;
        campoBloqueos.wrap = 'off';
        campoBloqueos.classList.remove('vista-organizada');
        botonOrganizar.textContent = 'ORGANIZAR';
        vistaOrganizada = false;
    };

    const agregarTienda = (nomenclatura) => {
        volverAVistaOriginal();
        const contenidoActual = campoBloqueos.value.replace(/[\r\n\t ]+$/, '');
        campoBloqueos.value = `${contenidoActual}\n\n\n${nomenclatura}`;
        campoBloqueos.focus();
        campoBloqueos.setSelectionRange(0, 0);
        campoBloqueos.scrollTop = 0;
        campoBloqueos.scrollLeft = 0;
        showNotification(`${nomenclatura} agregado al cuadro`);
    };

    const organizarResultado = (texto) => {
        const lineas = texto.replace(/\r/g, '').split('\n');
        const filas = [];
        const extras = [];
        let tienda = '';

        for (const lineaOriginal of lineas) {
            const linea = lineaOriginal.trim();
            if (!linea) continue;

            if (/^(GCA|PMI|TFE|LZA|SDQ|PUR|CAU|VAL)$/.test(linea)) {
                tienda = linea;
                continue;
            }

            if (/^blocked_pid\s*\|\s*blocking_pid\s*\|/i.test(linea)) continue;
            if (/^-+\s*\+-+\s*\+-+/.test(linea)) continue;

            // Solo divide los dos primeros separadores. La consulta se conserva completa,
            // aunque incluya otros caracteres "|" dentro del SQL.
            const coincidencia = lineaOriginal.match(/^\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(.*)$/);
            if (coincidencia) {
                filas.push({
                    bloqueado: coincidencia[1],
                    bloqueador: coincidencia[2],
                    consulta: coincidencia[3]
                });
                continue;
            }

            // Conserva literalmente pies como "(6 filas)", "(END)" y cualquier
            // información adicional que PostgreSQL haya mostrado.
            extras.push(lineaOriginal);
        }

        if (!filas.length) return null;

        const anchoBloqueado = Math.max('blocked_pid'.length, ...filas.map(f => f.bloqueado.length));
        const anchoBloqueador = Math.max('blocking_pid'.length, ...filas.map(f => f.bloqueador.length));

        const cabecera = `${'blocked_pid'.padEnd(anchoBloqueado)} | ${'blocking_pid'.padEnd(anchoBloqueador)} | query_blocked`;
        const separador = `${'-'.repeat(anchoBloqueado)}-+-${'-'.repeat(anchoBloqueador)}-+-${'-'.repeat(120)}`;
        const cuerpo = filas.map(fila =>
            `${fila.bloqueado.padStart(anchoBloqueado)} | ${fila.bloqueador.padStart(anchoBloqueador)} | ${fila.consulta}`
        );

        const resultado = [cabecera, separador, ...cuerpo];

        if (extras.length) {
            resultado.push('', ...extras);
        }

        if (tienda) {
            resultado.push('', '', '', tienda);
        }

        return resultado.join('\n');
    };

    Object.entries(tiendas).forEach(([idBoton, nomenclatura]) => {
        const boton = document.getElementById(idBoton);
        boton?.addEventListener('click', () => agregarTienda(nomenclatura));
    });

    botonOrganizar?.addEventListener('click', () => {
        if (vistaOrganizada) {
            volverAVistaOriginal();
            campoBloqueos.focus();
            showNotification('Vista original restaurada');
            return;
        }

        if (!campoBloqueos.value.trim()) {
            showNotification('Pega primero el resultado de los bloqueos', true);
            campoBloqueos.focus();
            return;
        }

        const organizado = organizarResultado(campoBloqueos.value);
        if (!organizado) {
            showNotification('No se reconocieron filas de bloqueo para organizar', true);
            return;
        }

        textoOriginal = campoBloqueos.value;
        campoBloqueos.value = organizado;
        campoBloqueos.wrap = 'off';
        campoBloqueos.classList.add('vista-organizada');
        campoBloqueos.scrollTop = 0;
        campoBloqueos.scrollLeft = 0;
        botonOrganizar.textContent = 'VER ORIGINAL';
        vistaOrganizada = true;
        showNotification('Bloqueos alineados como tabla sin perder el original');
    });

    botonCopiar?.addEventListener('click', () => {
        if (!campoBloqueos.value.trim()) {
            showNotification('No hay contenido para copiar', true);
            campoBloqueos.focus();
            return;
        }
        copyToClipboard(campoBloqueos.value);
    });

    botonLimpiar?.addEventListener('click', () => {
        campoBloqueos.value = '';
        textoOriginal = '';
        vistaOrganizada = false;
        campoBloqueos.wrap = 'off';
        campoBloqueos.classList.remove('vista-organizada');
        if (botonOrganizar) botonOrganizar.textContent = 'ORGANIZAR';
        campoBloqueos.focus();
        showNotification('Cuadro de bloqueos limpiado');
    });

    // Si el usuario edita una vista organizada, se conserva esa edición como
    // contenido actual, pero la opción VER ORIGINAL sigue recuperando lo pegado.
});

async function copiarColumnaPid(indiceColumna) {
    const cuadro = document.getElementById("bloqueos-tiendas");

    if (!cuadro) {
        alert("No se encontró el cuadro de bloqueos.");
        return;
    }

    const lineas = cuadro.value.split(/\r?\n/);

    const numeros = lineas
        .map(function (linea) {
            return linea.split("|");
        })
        .filter(function (columnas) {
            return columnas.length >= 2;
        })
        .map(function (columnas) {
            return columnas[indiceColumna].trim();
        })
        .filter(function (valor) {
            return /^\d+$/.test(valor);
        });

    if (numeros.length === 0) {
        alert("No se encontraron PID en esa columna.");
        return;
    }

    const resultado = numeros.join("\n");

    try {
        await navigator.clipboard.writeText(resultado);
        alert("¡PID copiados al portapapeles!");
    } catch (error) {
        const temporal = document.createElement("textarea");

        temporal.value = resultado;
        temporal.style.position = "fixed";
        temporal.style.opacity = "0";

        document.body.appendChild(temporal);
        temporal.select();
        document.execCommand("copy");
        document.body.removeChild(temporal);

        alert("¡PID copiados al portapapeles!");
    }
}
