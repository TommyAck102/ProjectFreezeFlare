using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Project_FreezeFlare
{

    public enum TransitionParameter
    {
        Move,
    }
    public class PlayerControl : MonoBehaviour
    {
        public float MovementSpeed;
        public Animator playerAnimator;
        public bool MoveRight;
        public bool MoveLeft;
        //I believe this is to help with multiple input types, this one for keyboard.

    }
}

