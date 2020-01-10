using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Project_FreezeFlare
{

    public enum TransitionParameter
    {
        Move,
    }
    public class PlayerMovement : MonoBehaviour
    {
        public float MovementSpeed;
        public Animator playerAnimator;
        //I believe this is to help with multiple input types, this one for keyboard.
        void Update()
        {
            if(VirtualInputManager.Instance.MoveRight && VirtualInputManager.Instance.MoveLeft)
            {
                playerAnimator.SetBool(TransitionParameter.Move.ToString(), false);
                return;
            }

            if(!VirtualInputManager.Instance.MoveLeft && !VirtualInputManager.Instance.MoveRight)
            {
                playerAnimator.SetBool(TransitionParameter.Move.ToString(), false);
            }

            if (VirtualInputManager.Instance.MoveRight)
            {
                this.gameObject.transform.Translate(Vector3.right * MovementSpeed * Time.deltaTime);
                this.gameObject.transform.rotation = Quaternion.Euler(0f, 0f, 0f);
                playerAnimator.SetBool(TransitionParameter.Move.ToString(), true);
            }

            if (VirtualInputManager.Instance.MoveLeft)
            {
                this.gameObject.transform.Translate(Vector3.right * MovementSpeed * Time.deltaTime);
                this.gameObject.transform.rotation = Quaternion.Euler(0f, -180f, 0f);
                playerAnimator.SetBool(TransitionParameter.Move.ToString(), true);
            }


        }

    }
}

