/**
 * Fine barre cobalt en haut de l'écran, sur les études de cas uniquement.
 * Pilotée par le défilement en CSS (animation-timeline: scroll()), sans JavaScript.
 * Navigateurs sans cette fonction : la barre reste simplement absente.
 */
export function ReadingProgress() {
  return <div aria-hidden className="progression fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-cobalt" />;
}
