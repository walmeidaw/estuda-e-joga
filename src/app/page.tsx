import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Achievement } from "@/components/achievement/achievement.component"
import { getAllUserAchievements } from "@/lib/repository/gamification/userAchievement"
import { getAllAchievements } from '@/lib/repository/gamification/achievement';
import { UnlockAchievement } from '@/components/achievement/unlock.component';

export default async function Home() {
  const myAchievements = await getAllUserAchievements(1)
  const achievements = (await getAllAchievements()).filter( (ach : any) => !myAchievements.find( (my:any) => my.achievement_id === ach.id && my.unlocked ) )

  return (
    <main className='mx-4'>
      <div className="h-20"></div>
      <div className="max-w-screen-xl m-auto flex gap-8 flex-col">
        <section className="flex gap-4 flex-col">
          <p>Oi <strong>Willian</strong>!</p>
          <p>O que vamos estudar hoje?</p>
        </section>
        <section className="flex gap-4 flex-col">
          <h2 className="uppercase font-bold">Últimas conquistas</h2>
          <div className="flex flex-row gap-4 flex-wrap">
            { 
              myAchievements.length == 0 ?              
              <div className='flex flex-1 text-sm text-slate-400 bg-slate-50 p-8 rounded-[16px]'>Você não tem conquistas.</div> 
              :
              myAchievements.map( 
                ( achievement : any ) => {
                  if( achievement.unlocked ){
                    return <Achievement key={ achievement.id } icon={ achievement.achievement_icon } title={ achievement.achievement_name } subtitle={ formatDistanceToNowStrict( achievement.unlocked_at, { locale: ptBR, addSuffix: true } ) } />
                  }else{
                    return <div key={ achievement.id } title="Conquista em andamento" className="opacity-60"><Achievement icon={ achievement.achievement_icon } title={ achievement.achievement_name } subtitle={ `${ achievement.progress } de ${ achievement.achievement_incremental } restantes` } /></div>
                  }
                }
              )
            }
          </div>
        </section>
        <section className="flex gap-4 flex-col">
          <h2 className="uppercase font-bold">Conquistas disponíveis</h2>
          <p>Clique para desbloquear a conquista.</p>
          <div className="flex flex-row gap-4 flex-wrap">
            { achievements.length == 0 ?
              <div className='flex flex-1 text-sm text-slate-400 bg-slate-50 p-8 rounded-[16px]'>Todas as conquistas foram desbloqueadas.</div> 
              :
              achievements.map( 
                ( achievement : any ) => <div key={ achievement.id }>
                  <UnlockAchievement achievementId={ achievement.id } icon={ achievement.icon } title={ achievement.name } subtitle={ "bloqueada" } />
                </div>
              )
            }
          </div>
        </section>
      </div>
    </main>
  )
}
