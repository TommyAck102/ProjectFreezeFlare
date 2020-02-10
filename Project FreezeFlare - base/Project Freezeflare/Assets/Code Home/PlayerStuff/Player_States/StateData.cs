using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Project_FreezeFlare
{
    public abstract class StateData : ScriptableObject
    {
        public float Duration;

        public abstract void UpdateAbility(PlayerStateBase characterStateBase, Animator animator);


    }
}