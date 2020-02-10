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

    }
}

