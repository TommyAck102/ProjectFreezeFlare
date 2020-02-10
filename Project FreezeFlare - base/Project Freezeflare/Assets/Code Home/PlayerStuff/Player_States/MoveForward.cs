using System.Collections;
using System.Collections.Generic;
using UnityEngine;



namespace Project_FreezeFlare
{
    [CreateAssetMenu(fileName = "New State", menuName = "ProjectFreezeFlare/AbilityData/MoveForward")]
    public class MoveForward : StateData
    {

        public float Speed;

        public override void UpdateAbility(PlayerStateBase characterStateBase, Animator animator)
        {

            PlayerControl control = characterStateBase.GetPlayerControl(animator);

            if (control.MoveRight && control.MoveLeft)
            {
                animator.SetBool(TransitionParameter.Move.ToString(), false);
                return;
            }

            if (!control.MoveLeft && !control.MoveRight)
            {
                animator.SetBool(TransitionParameter.Move.ToString(), false);
                return;
            }

            if (control.MoveRight)
            {
                control.transform.Translate(Vector3.right * Speed * Time.deltaTime);
                control.transform.rotation = Quaternion.Euler(0f, 0f, 0f);

            }

            if (control.MoveLeft)
            {
                control.transform.Translate(Vector3.right * Speed * Time.deltaTime);
                control.transform.rotation = Quaternion.Euler(0f, -180f, 0f);
            }
        }
    }
      

}
