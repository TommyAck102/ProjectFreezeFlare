using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Project_FreezeFlare
{
[CreateAssetMenu(fileName = "New State", menuName = "ProjectFreezeFlare/AbilityData/Idle")]
    public class Idle : StateData
    {

        public override void UpdateAbility(PlayerStateBase characterStateBase, Animator animator)
        {
            if (VirtualInputManager.Instance.MoveRight)
            {

                animator.SetBool(TransitionParameter.Move.ToString(), true);
            }

            if (VirtualInputManager.Instance.MoveLeft)
            {

                animator.SetBool(TransitionParameter.Move.ToString(), true);
            }
        }



    }
    


}