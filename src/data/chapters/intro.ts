import type { Chapter } from '../../types/game'

export const introChapter: Chapter = {
  id: 'intro',
  title: 'Introducción',
  order: 0,
  minigameId: '',
  nextChapterId: 'cap1',
  learnings: ['Qué es emprender', 'Por qué necesitas un plan'],
  dialogs: [
    {
      character: 'narrator',
      text: 'Todo gran negocio comenzó con una sola idea...',
    },
    {
      character: 'main',
      text: '¡Siempre quise tener mi propio negocio! Pero no sé por dónde empezar.',
    },
    {
      character: 'mentor',
      text: '¡Hola! Me llamo Don Carlos. Soy asesor de emprendedores y vine a ayudarte.',
    },
    {
      character: 'main',
      text: '¿De verdad? ¡Necesito ayuda! Tengo muchas ganas pero no sé qué hacer primero.',
    },
    {
      character: 'mentor',
      text: 'Tranquilo. Emprender es un camino. Lo haremos paso a paso, desde la idea hasta tener una empresa formal.',
    },
    {
      character: 'friend',
      text: '¡Yo también quiero aprender! ¿Puedo acompañarlos?',
    },
    {
      character: 'mentor',
      text: 'Por supuesto. Cuantos más aprendan, mejor. Lo primero es entender qué es realmente emprender.',
    },
    {
      character: 'narrator',
      text: 'Emprender es identificar una necesidad en el mercado y crear una solución que genere valor. ¡Y tú puedes hacerlo!',
    },
  ],
}
