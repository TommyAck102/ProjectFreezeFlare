using System.Collections;
using System.Collections.Generic;
using UnityEngine;



namespace Project_FreezeFlare
{
    public class ManualInput : MonoBehaviour
    {
        private PlayerControl playerControl;

        private void Awake()
        {
            playerControl = this.GetComponent<PlayerControl>();
        }

        void Update()
        {
            if (VirtualInputManager.Instance.MoveRight)
            {
                playerControl.MoveRight = true;
            }
            else
            {
                playerControl.MoveRight = false;
            }
            if (VirtualInputManager.Instance.MoveLeft)
            {
                playerControl.MoveLeft = true;
            }
            else
            {
                playerControl.MoveLeft = false;
            }

        }


    }
}