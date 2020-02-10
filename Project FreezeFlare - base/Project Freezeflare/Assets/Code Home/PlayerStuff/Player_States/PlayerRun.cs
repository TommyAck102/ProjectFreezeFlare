using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Project_FreezeFlare
{


    public class PlayerRun : PlayerStateBase
    {
        // OnStateEnter is called when a transition starts and the state machine starts to evaluate this state
        override public void OnStateEnter(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
        {

        }

        // OnStateUpdate is called on each Update frame between OnStateEnter and OnStateExit callbacks
        override public void OnStateUpdate(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
        {
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
                GetPlayerControl(animator).transform.Translate(Vector3.right * GetPlayerControl(animator).MovementSpeed * Time.deltaTime);
                GetPlayerControl(animator).transform.rotation = Quaternion.Euler(0f, 0f, 0f);
 
            }

            if (VirtualInputManager.Instance.MoveLeft)
            {
                GetPlayerControl(animator).transform.Translate(Vector3.right * GetPlayerControl(animator).MovementSpeed * Time.deltaTime);
                GetPlayerControl(animator).transform.rotation = Quaternion.Euler(0f, -180f, 0f);

            }
        }

        // OnStateExit is called when a transition ends and the state machine finishes evaluating this state
        override public void OnStateExit(Animator animator, AnimatorStateInfo stateInfo, int layerIndex)
        {

        }
    }
}
