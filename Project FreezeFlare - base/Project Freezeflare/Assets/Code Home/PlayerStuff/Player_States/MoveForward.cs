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

            PlayerMovement c = characterStateBase.GetPlayerControl(animator);

            if (VirtualInputManager.Instance.MoveRight && VirtualInputManager.Instance.MoveLeft)
            {
                animator.SetBool(TransitionParameter.Move.ToString(), false);
                return;
            }

            if (!VirtualInputManager.Instance.MoveLeft && !VirtualInputManager.Instance.MoveRight)
            {
                animator.SetBool(TransitionParameter.Move.ToString(), false);
                return;
            }

            if (VirtualInputManager.Instance.MoveRight)
            {
                c.transform.Translate(Vector3.right * Speed * Time.deltaTime);
                c.transform.rotation = Quaternion.Euler(0f, 0f, 0f);

            }

            if (VirtualInputManager.Instance.MoveLeft)
            {
                c.transform.Translate(Vector3.right * Speed * Time.deltaTime);
                c.transform.rotation = Quaternion.Euler(0f, -180f, 0f);

            }
        }
    }
      

}
