import type { Minigame } from '../../types/game'

export const minigames: Record<string, Minigame> = {

  // ── Cap 1: Idea de negocio ──────────────────────────────────────────────
  'idea-negocio': {
    id: 'idea-negocio',
    title: 'Idea de negocio',
    chapterId: 'cap1',
    sublevels: [
      {
        id: 'ib-1',
        title: '¿Qué es emprender?',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'ib1-1',
              question: '¿Qué significa emprender?',
              options: ['Iniciar un proyecto o negocio para generar valor', 'Trabajar para una empresa grande', 'Ahorrar dinero en el banco'],
              correctIndex: 0,
              explanation: 'Emprender es iniciar una actividad identificando una oportunidad y aportando valor al mercado.',
            },
            {
              id: 'ib1-2',
              question: '¿Cuál es el primer paso para emprender?',
              options: ['Contratar empleados', 'Identificar una necesidad o problema en el mercado', 'Comprar un local grande'],
              correctIndex: 1,
              explanation: 'Toda empresa nace de detectar una necesidad real. Sin eso, no hay negocio sostenible.',
            },
            {
              id: 'ib1-3',
              question: '¿Cuál de estas ideas es más viable para empezar con pocos recursos?',
              options: ['Abrir un restaurante de lujo', 'Vender productos hechos a mano por encargo', 'Importar autos del extranjero'],
              correctIndex: 1,
              explanation: 'Empezar con bajo costo y riesgo controlado es clave. Los negocios por encargo permiten validar antes de invertir mucho.',
            },
          ],
        },
      },
      {
        id: 'ib-2',
        title: 'Relaciona la oportunidad',
        rewardBonus: 250,
        activity: {
          type: 'match-columns',
          data: {
            id: 'ib-match',
            instruction: 'Empareja cada necesidad del mercado con el negocio que la resuelve.',
            pairs: [
              { id: 'm1', left: '🕐 Personas sin tiempo para cocinar', right: 'Servicio de delivery de comida' },
              { id: 'm2', left: '📚 Estudiantes que necesitan útiles cerca', right: 'Librería o bazar escolar' },
              { id: 'm3', left: '🧹 Familias que no pueden limpiar el hogar', right: 'Servicio de limpieza a domicilio' },
              { id: 'm4', left: '💻 Empresas que no saben llevar su contabilidad', right: 'Asesoría contable y tributaria' },
            ],
          },
        },
      },
    ],
  },

  // ── Cap 2: RUC ──────────────────────────────────────────────────────────
  'ruc': {
    id: 'ruc',
    title: 'El RUC',
    chapterId: 'cap2',
    sublevels: [
      {
        id: 'ruc-1',
        title: 'Conceptos básicos del RUC',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'ruc1-1',
              question: '¿Qué significa RUC?',
              options: ['Registro Único de Contribuyentes', 'Registro Universal Comercial', 'Recibo Único de Compras'],
              correctIndex: 0,
              explanation: 'RUC significa Registro Único de Contribuyentes. Es el número que identifica a toda persona o empresa ante SUNAT.',
            },
            {
              id: 'ruc1-2',
              question: '¿Para qué sirve el RUC?',
              options: ['Para decorar el local del negocio', 'Para identificar formalmente a un contribuyente ante el Estado', 'Para abrir redes sociales del negocio'],
              correctIndex: 1,
              explanation: 'El RUC identifica al contribuyente y permite realizar trámites tributarios, emitir comprobantes y operar formalmente.',
            },
            {
              id: 'ruc1-3',
              question: '¿Quiénes necesitan RUC?',
              options: ['Solo las empresas con más de 10 empleados', 'Toda persona o negocio que realice actividades económicas', 'Solo los que venden productos físicos'],
              correctIndex: 1,
              explanation: 'Cualquier persona natural o jurídica que realice actividades generadoras de renta debe tener RUC.',
            },
          ],
        },
      },
      {
        id: 'ruc-2',
        title: 'Pasos para obtener el RUC',
        rewardBonus: 250,
        activity: {
          type: 'sequence',
          data: {
            id: 'ruc-seq',
            instruction: 'Ordena los pasos correctos para obtener el RUC de un negocio.',
            steps: [
              { id: 's1', label: 'Decidir formalizar el negocio' },
              { id: 's2', label: 'Reunir DNI y datos del negocio' },
              { id: 's3', label: 'Ingresar a la plataforma de SUNAT' },
              { id: 's4', label: 'Completar el formulario de inscripción' },
              { id: 's5', label: 'Obtener el número de RUC de 11 dígitos' },
            ],
          },
        },
      },
      {
        id: 'ruc-3',
        title: 'Verdadero o falso: RUC',
        rewardBonus: 200,
        activity: {
          type: 'true-false',
          data: [
            { id: 'ruc3-1', statement: 'El RUC permite emitir comprobantes de pago válidos.', isTrue: true, explanation: 'Correcto. Sin RUC no puedes emitir boletas ni facturas formales.' },
            { id: 'ruc3-2', statement: 'Solo las empresas grandes necesitan RUC.', isTrue: false, explanation: 'Falso. Incluso un emprendedor que vende desde casa necesita RUC para operar legalmente.' },
            { id: 'ruc3-3', statement: 'El RUC ayuda a realizar trámites formales ante el Estado.', isTrue: true, explanation: 'Correcto. Con RUC puedes acceder a créditos formales, licitaciones y otros beneficios.' },
            { id: 'ruc3-4', statement: 'Se puede formalizar un negocio sin RUC.', isTrue: false, explanation: 'Falso. El RUC es el primer paso de la formalización tributaria en el Perú.' },
          ],
        },
      },
    ],
  },

  // ── Cap 3: Inventario ───────────────────────────────────────────────────
  'inventario': {
    id: 'inventario',
    title: 'Control de inventario',
    chapterId: 'cap3',
    sublevels: [
      {
        id: 'inv-1',
        title: 'Conceptos de inventario',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'inv1-1',
              question: '¿Qué es el stock de un negocio?',
              options: ['El dinero en caja', 'La cantidad de productos disponibles para vender', 'Las deudas del negocio'],
              correctIndex: 1,
              explanation: 'El stock es el inventario de productos disponibles. Controlarlo evita pérdidas y quiebres.',
            },
            {
              id: 'inv1-2',
              question: 'Si compraste 20 gaseosas y vendiste 5, ¿cuántas tienes en stock?',
              options: ['25', '15', '5'],
              correctIndex: 1,
              explanation: 'Stock final = Entradas - Salidas. 20 - 5 = 15 unidades disponibles.',
            },
            {
              id: 'inv1-3',
              question: '¿Qué puede pasar si no controlas tu inventario?',
              options: ['Nada, las ventas no dependen del stock', 'Puedes perder ventas, tener desorden y no saber cuánto producto queda', 'Solo pierdes tiempo'],
              correctIndex: 1,
              explanation: 'Sin control de inventario puedes quedarte sin producto, perder clientes y no saber si estás ganando o perdiendo.',
            },
          ],
        },
      },
      {
        id: 'inv-2',
        title: 'Completa la tabla de stock',
        rewardBonus: 300,
        activity: {
          type: 'interactive-table',
          data: {
            id: 'inv-tabla',
            instruction: 'Completa el stock final de cada producto. Recuerda: Stock final = Entradas − Ventas',
            headers: ['Producto', 'Entradas', 'Ventas', 'Stock final'],
            rows: [
              { id: 'r1', cells: ['🥤 Gaseosa', 20, 5, null], answerIndex: 3, answer: 15 },
              { id: 'r2', cells: ['🍪 Galletas', 30, 12, null], answerIndex: 3, answer: 18 },
              { id: 'r3', cells: ['💧 Agua', 50, 23, null], answerIndex: 3, answer: 27 },
              { id: 'r4', cells: ['🍫 Chocolates', 15, 15, null], answerIndex: 3, answer: 0 },
            ],
          },
        },
      },
      {
        id: 'inv-3',
        title: 'Verdadero o falso: inventario',
        rewardBonus: 200,
        activity: {
          type: 'true-false',
          data: [
            { id: 'inv3-1', statement: 'Controlar el inventario ayuda a evitar quedar sin producto.', isTrue: true, explanation: 'Correcto. Saber cuánto stock tienes te permite reponer a tiempo.' },
            { id: 'inv3-2', statement: 'Solo necesitas llevar inventario si tienes más de 50 productos.', isTrue: false, explanation: 'Falso. Desde el primer producto que vendes debes llevar un registro.' },
            { id: 'inv3-3', statement: 'Una "entrada" en inventario es cuando compras mercadería.', isTrue: true, explanation: 'Correcto. Las entradas son las compras o ingresos de mercadería al almacén.' },
          ],
        },
      },
    ],
  },

  // ── Cap 4: Ingresos y gastos ────────────────────────────────────────────
  'ingresos-gastos': {
    id: 'ingresos-gastos',
    title: 'Ingresos y Gastos',
    chapterId: 'cap4',
    sublevels: [
      {
        id: 'ig-1',
        title: 'Clasifica ingresos y gastos',
        rewardBonus: 250,
        activity: {
          type: 'drag-drop',
          data: {
            id: 'ig-drag',
            instruction: 'Arrastra cada concepto a la categoría correcta: ¿Es un Ingreso o un Gasto?',
            categories: ['💵 Ingreso', '💸 Gasto'],
            items: [
              { id: 'd1', label: '💰 Venta de productos', correctCategory: '💵 Ingreso' },
              { id: 'd2', label: '🏠 Pago de alquiler', correctCategory: '💸 Gasto' },
              { id: 'd3', label: '📦 Compra de mercadería', correctCategory: '💸 Gasto' },
              { id: 'd4', label: '💳 Cobro a un cliente', correctCategory: '💵 Ingreso' },
              { id: 'd5', label: '💡 Pago de electricidad', correctCategory: '💸 Gasto' },
              { id: 'd6', label: '🎁 Servicio prestado cobrado', correctCategory: '💵 Ingreso' },
              { id: 'd7', label: '📱 Pago de internet del negocio', correctCategory: '💸 Gasto' },
              { id: 'd8', label: '🤝 Comisión cobrada por venta', correctCategory: '💵 Ingreso' },
            ],
          },
        },
      },
      {
        id: 'ig-2',
        title: 'Calcula la ganancia',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'ig2-1',
              question: 'Un negocio tuvo ventas de S/ 1,500, compró mercadería por S/ 400 y pagó alquiler S/ 300. ¿Cuánto ganó?',
              options: ['S/ 1,500', 'S/ 800', 'S/ 700'],
              correctIndex: 1,
              explanation: 'Ganancia = Ingresos - Gastos. S/ 1,500 - S/ 400 - S/ 300 = S/ 800.',
            },
            {
              id: 'ig2-2',
              question: '¿Cuál es la diferencia entre ingreso y ganancia?',
              options: ['Son lo mismo', 'El ingreso es todo lo que entra; la ganancia es lo que queda después de pagar los gastos', 'La ganancia siempre es mayor que el ingreso'],
              correctIndex: 1,
              explanation: 'Ingreso = dinero que entra. Ganancia = Ingresos - Gastos. Siempre hay que restar los costos.',
            },
            {
              id: 'ig2-3',
              question: 'Si vendes S/ 2,000 pero tus gastos suman S/ 2,100, ¿qué significa eso?',
              options: ['Que tuviste ganancia de S/ 100', 'Que tuviste pérdida de S/ 100', 'Que tu negocio está en equilibrio'],
              correctIndex: 1,
              explanation: 'Cuando los gastos superan los ingresos hay pérdida. Es urgente reducir costos o aumentar ventas.',
            },
          ],
        },
      },
      {
        id: 'ig-3',
        title: 'Completa el estado de resultados',
        rewardBonus: 300,
        activity: {
          type: 'interactive-table',
          data: {
            id: 'ig-tabla',
            instruction: 'Calcula la ganancia de cada semana. Ganancia = Ventas − Gastos',
            headers: ['Semana', 'Ventas (S/)', 'Gastos (S/)', 'Ganancia (S/)'],
            rows: [
              { id: 'w1', cells: ['Semana 1', 800, 300, null], answerIndex: 3, answer: 500 },
              { id: 'w2', cells: ['Semana 2', 1200, 700, null], answerIndex: 3, answer: 500 },
              { id: 'w3', cells: ['Semana 3', 950, 400, null], answerIndex: 3, answer: 550 },
              { id: 'w4', cells: ['Semana 4', 600, 650, null], answerIndex: 3, answer: -50 },
            ],
          },
        },
      },
    ],
  },

  // ── Cap 5: Comprobantes ─────────────────────────────────────────────────
  'comprobantes': {
    id: 'comprobantes',
    title: 'Comprobantes de pago',
    chapterId: 'cap5',
    sublevels: [
      {
        id: 'cp-1',
        title: '¿Qué comprobante corresponde?',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'cp1-1',
              question: 'Un cliente compra para uso personal. ¿Qué comprobante le das?',
              options: ['Factura', 'Boleta de venta', 'Nota de crédito'],
              correctIndex: 1,
              explanation: 'La boleta de venta se emite a personas naturales que compran para consumo personal.',
            },
            {
              id: 'cp1-2',
              question: 'Una empresa te compra productos para su negocio. ¿Qué comprobante emites?',
              options: ['Boleta de venta', 'Ticket de caja', 'Factura'],
              correctIndex: 2,
              explanation: 'La factura se emite a empresas o personas con RUC que necesitan sustentar el gasto.',
            },
            {
              id: 'cp1-3',
              question: '¿Por qué es importante emitir comprobantes?',
              options: ['No es importante, es solo un papel', 'Acredita la operación, protege al cliente y cumple obligaciones tributarias', 'Solo sirve para llevar registro interno'],
              correctIndex: 1,
              explanation: 'Los comprobantes son obligatorios. Protegen al consumidor y son parte del control tributario de SUNAT.',
            },
          ],
        },
      },
      {
        id: 'cp-2',
        title: 'Relaciona el comprobante con su uso',
        rewardBonus: 250,
        activity: {
          type: 'match-columns',
          data: {
            id: 'cp-match',
            instruction: 'Empareja cada tipo de comprobante con su descripción correcta.',
            pairs: [
              { id: 'c1', left: '🧾 Boleta de venta', right: 'Para ventas a personas naturales y consumo final' },
              { id: 'c2', left: '📄 Factura', right: 'Para ventas a empresas con RUC que sustentan gastos' },
              { id: 'c3', left: '🔴 Nota de crédito', right: 'Anula o reduce el monto de una operación anterior' },
              { id: 'c4', left: '🟢 Nota de débito', right: 'Aumenta el monto de una operación ya emitida' },
            ],
          },
        },
      },
      {
        id: 'cp-3',
        title: 'Verdadero o falso: comprobantes',
        rewardBonus: 200,
        activity: {
          type: 'true-false',
          data: [
            { id: 'cp3-1', statement: 'La boleta de venta se puede usar para sustentar gastos de una empresa.', isTrue: false, explanation: 'Falso. Solo la factura permite a una empresa sustentar gastos ante SUNAT.' },
            { id: 'cp3-2', statement: 'Un negocio sin RUC puede emitir facturas válidas.', isTrue: false, explanation: 'Falso. Para emitir comprobantes válidos se necesita RUC activo.' },
            { id: 'cp3-3', statement: 'La factura electrónica tiene la misma validez legal que la física.', isTrue: true, explanation: 'Correcto. SUNAT reconoce plenamente los comprobantes electrónicos.' },
          ],
        },
      },
    ],
  },

  // ── Cap 6: Tributos ─────────────────────────────────────────────────────
  'tributos': {
    id: 'tributos',
    title: 'Tributos y responsabilidad',
    chapterId: 'cap6',
    sublevels: [
      {
        id: 'trib-1',
        title: '¿Qué son los tributos?',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'trib1-1',
              question: '¿Qué son los tributos?',
              options: ['Un regalo voluntario al gobierno', 'Obligaciones que pagan personas y empresas para financiar servicios públicos', 'Multas por incumplir leyes'],
              correctIndex: 1,
              explanation: 'Los tributos son aportaciones obligatorias que financian servicios como salud, educación e infraestructura.',
            },
            {
              id: 'trib1-2',
              question: '¿Qué régimen tributario es más común para pequeños emprendedores en Perú?',
              options: ['Régimen General', 'Nuevo RUS (NRUS)', 'Régimen Laboral Especial'],
              correctIndex: 1,
              explanation: 'El Nuevo RUS permite pagar una cuota fija mensual muy baja si las ventas son menores a S/ 5,000 al mes.',
            },
            {
              id: 'trib1-3',
              question: '¿Qué pasa si un negocio no cumple con sus tributos?',
              options: ['Nada, SUNAT no fiscaliza negocios pequeños', 'Puede recibir multas, cierre del local y embargo', 'Solo recibe una advertencia verbal'],
              correctIndex: 1,
              explanation: 'SUNAT tiene facultad para multar, cerrar locales y embargar bienes de quienes incumplen sus obligaciones tributarias.',
            },
          ],
        },
      },
      {
        id: 'trib-2',
        title: 'Clasifica los tributos',
        rewardBonus: 250,
        activity: {
          type: 'drag-drop',
          data: {
            id: 'trib-drag',
            instruction: 'Clasifica cada concepto según si es un tributo o un beneficio de ser formal.',
            categories: ['📋 Tributo / Obligación', '🎁 Beneficio de ser formal'],
            items: [
              { id: 't1', label: '💸 Pago del IGV', correctCategory: '📋 Tributo / Obligación' },
              { id: 't2', label: '✅ Acceso a créditos bancarios', correctCategory: '🎁 Beneficio de ser formal' },
              { id: 't3', label: '📅 Declaración mensual a SUNAT', correctCategory: '📋 Tributo / Obligación' },
              { id: 't4', label: '🏆 Participar en licitaciones del Estado', correctCategory: '🎁 Beneficio de ser formal' },
              { id: 't5', label: '💰 Pago del Impuesto a la Renta', correctCategory: '📋 Tributo / Obligación' },
              { id: 't6', label: '🤝 Emitir comprobantes válidos', correctCategory: '🎁 Beneficio de ser formal' },
            ],
          },
        },
      },
      {
        id: 'trib-3',
        title: 'Verdadero o falso: tributos',
        rewardBonus: 200,
        activity: {
          type: 'true-false',
          data: [
            { id: 'trib3-1', statement: 'Un negocio formal debe cumplir con sus obligaciones tributarias.', isTrue: true, explanation: 'Correcto. La formalidad implica cumplir obligaciones ante SUNAT.' },
            { id: 'trib3-2', statement: 'Si me va bien vendiendo, ya no necesito organizar mis deberes tributarios.', isTrue: false, explanation: 'Falso. Cuanto más vendes, más importante es mantener el orden tributario.' },
            { id: 'trib3-3', statement: 'Los tributos financian hospitales, escuelas y carreteras.', isTrue: true, explanation: 'Correcto. Los tributos son el principal financiamiento de los servicios públicos.' },
          ],
        },
      },
    ],
  },

  // ── Cap 7: Crecimiento ──────────────────────────────────────────────────
  'crecimiento': {
    id: 'crecimiento',
    title: 'Crecimiento del negocio',
    chapterId: 'cap7',
    sublevels: [
      {
        id: 'crec-1',
        title: 'Decisiones de crecimiento',
        rewardBonus: 200,
        activity: {
          type: 'multiple-choice',
          data: [
            {
              id: 'crec1-1',
              question: '¿Qué significa reinvertir en un negocio?',
              options: ['Gastar las ganancias en uso personal', 'Usar parte de las ganancias para mejorar o expandir el negocio', 'Pedir un préstamo bancario siempre'],
              correctIndex: 1,
              explanation: 'Reinvertir es destinar parte de las ganancias al propio negocio para crecer de forma sostenida.',
            },
            {
              id: 'crec1-2',
              question: 'Tus clientes aumentaron y se agota rápido el producto. ¿Qué conviene hacer primero?',
              options: ['Subir los precios al doble', 'Reponer y aumentar el stock para no perder ventas', 'Reducir el horario de atención'],
              correctIndex: 1,
              explanation: 'Si la demanda crece debes abastecerte. No tener producto hace que pierdas ventas y clientes.',
            },
            {
              id: 'crec1-3',
              question: '¿Cuál de estas acciones ayuda más al crecimiento sostenible?',
              options: ['Gastar todo en publicidad sin medir resultados', 'Llevar registro de ventas, gastos y clientes para tomar mejores decisiones', 'Eliminar todos los gastos incluyendo los necesarios'],
              correctIndex: 1,
              explanation: 'Un negocio que mide sus resultados puede tomar decisiones inteligentes para crecer.',
            },
          ],
        },
      },
      {
        id: 'crec-2',
        title: 'Ordena las etapas del crecimiento',
        rewardBonus: 300,
        activity: {
          type: 'sequence',
          data: {
            id: 'crec-seq',
            instruction: 'Ordena las etapas del crecimiento de un negocio de menor a mayor madurez.',
            steps: [
              { id: 'e1', label: '🌱 Tener una idea de negocio y validarla' },
              { id: 'e2', label: '📋 Formalizarse y obtener el RUC' },
              { id: 'e3', label: '📦 Organizar el inventario y empezar a vender' },
              { id: 'e4', label: '💰 Controlar ingresos, gastos y calcular ganancias' },
              { id: 'e5', label: '🧾 Emitir comprobantes y cumplir con tributos' },
              { id: 'e6', label: '📈 Reinvertir y expandir el negocio' },
            ],
          },
        },
      },
      {
        id: 'crec-3',
        title: 'Estrategias de inversión',
        rewardBonus: 250,
        activity: {
          type: 'match-columns',
          data: {
            id: 'crec-match',
            instruction: 'Empareja cada problema del negocio con la mejor acción para resolverlo.',
            pairs: [
              { id: 'g1', left: '📦 Se agota el producto antes de fin de semana', right: 'Aumentar el stock y mejorar la gestión de inventario' },
              { id: 'g2', left: '👥 Pocos clientes conocen el negocio', right: 'Invertir en publicidad y redes sociales' },
              { id: 'g3', left: '💸 Los gastos superan los ingresos', right: 'Revisar y reducir costos innecesarios' },
              { id: 'g4', left: '🐢 Las ventas crecen muy lento', right: 'Ofrecer promociones y mejorar la atención al cliente' },
            ],
          },
        },
      },
    ],
  },
}
