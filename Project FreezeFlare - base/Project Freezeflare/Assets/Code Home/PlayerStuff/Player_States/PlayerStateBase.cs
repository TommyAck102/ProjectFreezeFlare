using System.Collections;
using System.Collections.Generic;
using UnityEngine;


namespace Project_FreezeFlare
{ 
    public class PlayerStateBase : StateMachineBehaviour
    {

        public List<StateData> ListAbilityData = new List<StateData>();

        public void UpdateAll(PlayerStateBase characterStateBase, Animator animator)
        {
            foreach(StateData d in ListAbilityData)
            {
                d.UpdateAbility(characterStateBase, animator);
            }
        }

        public override void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
        {
            UpdateAll(this, animator);
        }


        private PlayerControl playerControl;
        public PlayerControl GetPlayerControl(Animator animator)
        {
            if(playerControl == null)
            {

            playerControl = animator.GetComponentInParent<PlayerControl>();
      
            }

            return playerControl;
        }
    }


}
