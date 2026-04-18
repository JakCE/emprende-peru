import { introChapter } from './intro'
import type { Chapter } from '../../types/game'

const cap1: Chapter = {
  id: 'cap1', title: 'Idea de negocio', order: 1, minigameId: 'idea-negocio',
  learnings: ['Qué es una idea de negocio', 'Cómo identificar una oportunidad', 'Por qué no toda idea es viable'],
  dialogs: [
    { character: 'mentor', text: 'Muy bien. Ya sabes qué es emprender. Ahora necesitamos encontrar TU idea de negocio.' },
    { character: 'main', text: '¿Cómo sé cuál es la correcta? Tengo muchas ideas pero no sé cuál elegir.' },
    { character: 'mentor', text: 'La clave está en observar. ¿Qué problemas ves a tu alrededor que nadie está resolviendo bien?' },
    { character: 'friend', text: 'Por ejemplo, en mi barrio no hay un lugar donde vendan útiles escolares cerca. Todos tenemos que ir lejos.' },
    { character: 'mentor', text: '¡Exacto! Eso es una necesidad no cubierta. Y donde hay una necesidad, hay una oportunidad de negocio.' },
    { character: 'main', text: 'Entonces, ¿debo buscar algo que la gente necesite y que nadie esté ofreciendo bien?' },
    { character: 'mentor', text: 'Correcto. Y también evaluar si tienes los recursos para hacerlo. No toda idea buena es viable con lo que tienes ahora.' },
    { character: 'narrator', text: 'Recuerda: la mejor idea de negocio es aquella que resuelve un problema real, tiene demanda y puedes ejecutar con lo que tienes.' },
  ],
}

const cap2: Chapter = {
  id: 'cap2', title: 'Formalización: el RUC', order: 2, minigameId: 'ruc',
  learnings: ['Qué es el RUC', 'Para qué sirve', 'Por qué toda empresa necesita uno'],
  dialogs: [
    { character: 'main', text: 'Ya tengo mi idea. ¡Voy a vender snacks saludables cerca del instituto!' },
    { character: 'mentor', text: 'Excelente elección. Hay demanda y puedes empezar con poco capital. Pero antes de vender, debes formalizarte.' },
    { character: 'main', text: '¿Formalizarme? ¿Qué significa eso exactamente?' },
    { character: 'advisor', text: 'Hola, soy Ana, asesora de emprendedores. Formalizarte significa que tu negocio exista legalmente ante el Estado.' },
    { character: 'main', text: '¿Y cómo hago eso?' },
    { character: 'advisor', text: 'El primer paso es obtener tu RUC. Es el número que te identifica como contribuyente ante SUNAT.' },
    { character: 'friend', text: '¿Y si no lo tengo? ¿Qué pasa?' },
    { character: 'advisor', text: 'Sin RUC no puedes emitir comprobantes válidos, no puedes acceder a créditos formales y podrías recibir multas.' },
    { character: 'mentor', text: 'Además, los clientes, especialmente empresas, prefieren proveedores formales. La formalidad abre puertas.' },
    { character: 'narrator', text: 'El RUC no es un trámite opcional. Es el primer paso real para que tu negocio exista ante la ley.' },
  ],
}

const cap3: Chapter = {
  id: 'cap3', title: 'Organización: Inventario', order: 3, minigameId: 'inventario',
  learnings: ['Qué es el stock', 'Entradas y salidas', 'Cómo el control evita pérdidas'],
  dialogs: [
    { character: 'main', text: 'Ya tengo mi RUC y empecé a vender. ¡La gente compra bastante!' },
    { character: 'friend', text: 'Qué bueno. Pero oye... ¿sabes cuántos productos te quedan? ¿Cuánto vendiste esta semana?' },
    { character: 'main', text: 'Mmm... la verdad no. Más o menos creo que me quedan algunos.' },
    { character: 'mentor', text: 'Ahí está el problema. "Más o menos" no funciona en un negocio. Necesitas control de inventario.' },
    { character: 'main', text: '¿Inventario? ¿Eso no es solo para empresas grandes?' },
    { character: 'advisor', text: 'Para nada. Desde el primer día que vendes debes saber cuánto compraste, cuánto vendiste y cuánto te queda.' },
    { character: 'friend', text: '¿Y si no lo hago qué puede pasar?' },
    { character: 'advisor', text: 'Puedes quedarte sin producto sin darte cuenta, perder ventas, y no saber si realmente estás ganando o perdiendo dinero.' },
    { character: 'narrator', text: 'El inventario es el corazón de tu negocio. Sin él, navegas a ciegas. Con él, tomas decisiones inteligentes.' },
  ],
}

const cap4: Chapter = {
  id: 'cap4', title: 'Ingresos y Gastos', order: 4, minigameId: 'ingresos-gastos',
  learnings: ['Diferencia entre ingreso y gasto', 'Cómo calcular ganancia', 'Por qué vender mucho no siempre significa ganar'],
  dialogs: [
    { character: 'main', text: '¡Esta semana vendí todo! Fue un éxito total.' },
    { character: 'mentor', text: '¿Y cuánto ganaste?' },
    { character: 'main', text: 'Pues... vendí bastante así que debo haber ganado bastante, ¿no?' },
    { character: 'mentor', text: 'No necesariamente. Vender mucho no significa ganar mucho. ¿Cuánto gastaste para vender eso?' },
    { character: 'main', text: 'Bueno... compré mercadería, pagué el alquiler del puesto... no lo tengo claro.' },
    { character: 'advisor', text: 'Ese es el error más común. El ingreso es todo lo que entra. Pero la ganancia es lo que queda después de restar los gastos.' },
    { character: 'friend', text: 'O sea que si vendí S/ 500 pero gasté S/ 450, solo gané S/ 50.' },
    { character: 'advisor', text: 'Exactamente. Por eso debes registrar cada sol que entra y cada sol que sale. Sin eso, no sabes si tu negocio es rentable.' },
    { character: 'mentor', text: 'Un negocio que no mide sus números puede estar perdiendo dinero sin saberlo. Los números no mienten.' },
    { character: 'narrator', text: 'Ingreso menos gastos igual a ganancia. Aprende esa fórmula de memoria. Es la base de toda decisión empresarial.' },
  ],
}

const cap5: Chapter = {
  id: 'cap5', title: 'Comprobantes de pago', order: 5, minigameId: 'comprobantes',
  learnings: ['Tipos de comprobantes', 'Cuándo usar boleta o factura', 'Por qué son obligatorios'],
  dialogs: [
    { character: 'client', text: 'Hola, quiero comprar 10 cajas de snacks para mi empresa. ¿Me puede dar factura?' },
    { character: 'main', text: 'Eh... ¿factura? Yo solo daba boletas...' },
    { character: 'advisor', text: 'Tranquilo. Hay distintos tipos de comprobantes. La boleta es para personas que compran para consumo personal.' },
    { character: 'advisor', text: 'La factura es para empresas o personas con RUC que necesitan sustentar ese gasto ante SUNAT.' },
    { character: 'main', text: '¿Y puedo negarme a dar factura?' },
    { character: 'mentor', text: 'Técnicamente sí, pero perderías clientes empresariales, que suelen ser los que compran en mayor volumen.' },
    { character: 'friend', text: '¿Y si no tengo RUC activo? ¿Puedo emitir comprobantes igual?' },
    { character: 'advisor', text: 'No. Sin RUC activo no puedes emitir comprobantes válidos. Por eso la formalización es tan importante desde el inicio.' },
    { character: 'narrator', text: 'Cada venta debe ir acompañada del comprobante correcto. Es una obligación legal y también un signo de profesionalismo.' },
  ],
}

const cap6: Chapter = {
  id: 'cap6', title: 'Tributos y responsabilidad', order: 6, minigameId: 'tributos',
  learnings: ['Qué son los tributos', 'Regímenes tributarios básicos', 'Por qué cumplir con SUNAT'],
  dialogs: [
    { character: 'main', text: 'Mi negocio ya va bien. Tengo clientes, llevo mi inventario, emito comprobantes... ¿qué más falta?' },
    { character: 'advisor', text: 'Falta algo muy importante: cumplir con tus obligaciones tributarias.' },
    { character: 'main', text: '¿Los impuestos? Pero si soy pequeño, ¿tengo que pagar también?' },
    { character: 'advisor', text: 'Sí. Todo negocio formal, sin importar su tamaño, tiene obligaciones tributarias. Pero existen regímenes especiales para pequeños.' },
    { character: 'mentor', text: 'Por ejemplo, el Nuevo RUS te permite pagar una cuota fija mensual muy baja si tus ventas son menores a S/ 5,000 al mes.' },
    { character: 'friend', text: '¿Y si no pago? ¿Qué pasa?' },
    { character: 'advisor', text: 'SUNAT puede multarte, cerrarte el local y hasta embargarte. Las sanciones son mucho mayores que el tributo en sí.' },
    { character: 'main', text: 'Entiendo. Es mejor pagar lo que corresponde y estar tranquilo.' },
    { character: 'mentor', text: 'Además, los tributos no son solo una obligación. Son tu aporte a los hospitales, escuelas y carreteras que todos usamos.' },
    { character: 'narrator', text: 'Un empresario responsable cumple con sus tributos. No como carga, sino como parte del compromiso con su comunidad.' },
  ],
}

const cap7: Chapter = {
  id: 'cap7', title: 'Crecimiento del negocio', order: 7, minigameId: 'crecimiento',
  learnings: ['Qué es reinvertir', 'Cómo priorizar inversiones', 'Cómo sostener el crecimiento'],
  dialogs: [
    { character: 'main', text: 'Han pasado meses y mi negocio va muy bien. Tengo clientes fijos, llevo mis registros y cumplo con SUNAT.' },
    { character: 'mentor', text: 'Felicitaciones. Has construido una base sólida. Ahora viene la siguiente etapa: crecer.' },
    { character: 'main', text: 'Quiero crecer, pero no sé cómo. ¿Sigo igual hasta que llegue solo?' },
    { character: 'mentor', text: 'El crecimiento no llega solo. Debes planificarlo. ¿Qué mejorarías primero si tuvieras más dinero?' },
    { character: 'main', text: 'Creo que más mercadería, porque a veces me quedo sin stock.' },
    { character: 'advisor', text: 'Excelente instinto. Reponer y ampliar el stock es la prioridad si tu demanda supera tu oferta.' },
    { character: 'friend', text: '¿Y la publicidad? ¿No sirve para crecer?' },
    { character: 'advisor', text: 'Sí, pero primero asegúrate de poder atender más clientes. De nada sirve atraer clientes si no tienes producto.' },
    { character: 'mentor', text: 'El secreto del crecimiento sostenible es reinvertir con inteligencia: primero lo esencial, luego la expansión.' },
    { character: 'narrator', text: '¡Lo lograste! Tu negocio pasó de una idea a una empresa que crece. Eso es emprender de verdad.' },
  ],
}

export const chapters: Record<string, Chapter> = {
  intro: introChapter,
  cap1, cap2, cap3, cap4, cap5, cap6, cap7,
}
