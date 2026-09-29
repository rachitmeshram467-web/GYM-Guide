export const DEFAULT_EXERCISES = [
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    muscle: 'Chest',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'The premier compound pressing movement for maximal pectoral hypertrophy and horizontal pressing strength.',
    cues: 'Retract scapulae, plant feet flat, lower under control to lower sternum, press explosively upward.',
    common_mistakes: 'Flaring elbows at 90 degrees, bouncing the bar off the chest, raising hips off the bench.'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    muscle: 'Chest',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    description: 'Targets the clavicular head (upper chest) and anterior deltoids with free range of motion.',
    cues: 'Set bench to 30 degrees, tuck elbows at 45 degrees, squeeze chest at peak contraction.',
    common_mistakes: 'Bench incline too steep (>45 deg) shifting load to front delts, dropping elbows too low.'
  },
  {
    id: 'cable-chest-flye',
    name: 'Standing Cable Chest Flye',
    muscle: 'Chest',
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'Maintains constant mechanical tension across the pectorals throughout the entire horizontal adduction arc.',
    cues: 'Maintain slight elbow bend like hugging a giant barrel, bring knuckles together and squeeze pecs for 1 second.',
    common_mistakes: 'Turning the flye into a press, letting shoulders roll forward at the stretched position.'
  },
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    muscle: 'Back',
    equipment: 'Barbell',
    difficulty: 'Advanced',
    description: 'Foundational total posterior-chain powerhouse building immense spinal erectors, lats, and glute strength.',
    cues: 'Drag bar up shins, wedge hips down, brace lats like bending the bar, push floor away.',
    common_mistakes: 'Rounding lower back, allowing the bar to drift away from shins, jerking the bar off floor.'
  },
  {
    id: 'lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    muscle: 'Back',
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'Essential vertical pulling movement for developing wide, V-taper lats.',
    cues: 'Slight torso lean back (10-15 degrees), drive elbows down toward ribs, touch collarbone softly.',
    common_mistakes: 'Swinging torso violently backward, pulling bar behind neck, using momentum instead of lats.'
  },
  {
    id: 'chest-supported-t-bar-row',
    name: 'Chest-Supported T-Bar Row',
    muscle: 'Back',
    equipment: 'Machine',
    difficulty: 'Intermediate',
    description: 'Isolates the upper back and rhomboids without axial loading on the lower spine.',
    cues: 'Chest glued to pad, pull through elbows, pinch shoulder blades together tightly at top.',
    common_mistakes: 'Lifting chest off pad to cheat reps, shrugging shoulders up toward ears.'
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    muscle: 'Quads',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'The king of quad and lower body compound movements for systemic hypertrophy and leg mass.',
    cues: 'Deep 360-degree belly breath, screw feet into floor, break at hips and knees simultaneously, hit parallel.',
    common_mistakes: 'Knees caving inward (valgus collapse), weight shifting to toes, rounded thoracic spine.'
  },
  {
    id: 'leg-press',
    name: '45-Degree Leg Press',
    muscle: 'Quads',
    equipment: 'Machine',
    difficulty: 'Beginner',
    description: 'Mass builder allowing high-volume quad and glute loading with fixed back stabilization.',
    cues: 'Keep lower back and glutes pinned to the seat cushion, lower sled until 90-degree knee bend, do not lock knees violently.',
    common_mistakes: 'Pelvis curling up off the back pad (butt wink), locking out knees into hyperextension.'
  },
  {
    id: 'romanian-deadlift',
    name: 'Dumbbell Romanian Deadlift (RDL)',
    muscle: 'Hamstrings',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    description: 'Unrivaled eccentric loading on hamstrings and glutes through hip hinge mechanics.',
    cues: 'Soft knees, push hips backward towards the wall, keep dumbbells skimming your thighs, stop at mid-shin.',
    common_mistakes: 'Squatting the weight down instead of hinging, rounding the lumbar spine, hyper-extending at top.'
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Hamstring Leg Curl',
    muscle: 'Hamstrings',
    equipment: 'Machine',
    difficulty: 'Beginner',
    description: 'Directly isolates the knee flexion function of the hamstrings under full stretch.',
    cues: 'Thigh pad snug against quads, curl heels completely under seat, hold 1-second squeeze at contraction.',
    common_mistakes: 'Allowing thighs to rise up off pad, letting weight slam down on the eccentric phase.'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    muscle: 'Glutes',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    description: 'Unilateral quad and glute torture device correcting muscle imbalances and enhancing hip stability.',
    cues: 'Rear foot elevated on bench, forward torso lean loads glutes, drop back knee toward floor.',
    common_mistakes: 'Stance too narrow causing knee strain, pushing through toes instead of front mid-foot and heel.'
  },
  {
    id: 'dumbbell-overhead-press',
    name: 'Seated Dumbbell Shoulder Press',
    muscle: 'Shoulders',
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    description: 'Compound vertical press building dense anterior and lateral deltoid caps.',
    cues: 'Slightly tuck elbows in scapular plane (60 degrees), press straight up until dumbbells softly meet.',
    common_mistakes: 'Excessive lower back arching, elbows flared out 90 degrees in coronal plane.'
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    muscle: 'Shoulders',
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'Provides continuous tension on the lateral deltoid head for that round, capped shoulder look.',
    cues: 'Set pulley at hand or knee height, lead with elbows, raise to shoulder height with thumbs level.',
    common_mistakes: 'Using traps to shrug the weight up, swinging the upper body for momentum.'
  },
  {
    id: 'face-pull',
    name: 'Rope Face Pull',
    muscle: 'Shoulders',
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'Crucial postural exercise targeting rear delts, rhomboids, and external rotators.',
    cues: 'Set pulley at eye height, pull towards forehead while pulling rope handles apart, rotate knuckles back.',
    common_mistakes: 'Pulling down toward chin, using excessive weight and leaning backward.'
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Bicep Curl',
    muscle: 'Biceps',
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    description: 'Places the bicep long head into an extreme passive stretch for maximal hypertrophy stimulus.',
    cues: 'Set bench to 60 degrees, let arms hang vertically behind torso, curl up while supinating palms.',
    common_mistakes: 'Swinging elbows forward to engage front delts, curling with momentum.'
  },
  {
    id: 'preacher-curl',
    name: 'EZ-Bar Preacher Curl',
    muscle: 'Biceps',
    equipment: 'Barbell',
    difficulty: 'Beginner',
    description: 'Eliminates shoulder involvement, isolating the bicep short head at the peak contraction zone.',
    cues: 'Armpits flush over the top of the preacher pad, lower bar under control to 95% extension, curl smoothly.',
    common_mistakes: 'Hyperextending elbows dangerously at the bottom, lifting hips off seat.'
  },
  {
    id: 'triceps-rope-pushdown',
    name: 'Cable Triceps Rope Pushdown',
    muscle: 'Triceps',
    equipment: 'Cable',
    difficulty: 'Beginner',
    description: 'Targets the lateral and medial heads of the triceps with comfortable wrist ergonomics.',
    cues: 'Pin elbows to your ribcage, push down and spread rope apart at bottom for peak triceps contraction.',
    common_mistakes: 'Letting elbows flare forward and back, leaning body over the cable to press with chest.'
  },
  {
    id: 'skull-crushers',
    name: 'Lying EZ-Bar Skull Crushers',
    muscle: 'Triceps',
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    description: 'Loads the long head of the triceps over a deep eccentric range behind the crown of the head.',
    cues: 'Keep upper arms tilted slightly backward (not 90 degrees), hinge at elbows towards your forehead/bench.',
    common_mistakes: 'Moving upper arms back and forth like a pullover, dropping bar onto forehead.'
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg & Knee Raise',
    muscle: 'Core',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    description: 'Dynamic abdominal movement curling the pelvis to fire the rectus abdominis without spinal crushing.',
    cues: 'Hang with active lats, curl knees or straight legs upward by rolling pelvis towards sternum.',
    common_mistakes: 'Swinging legs with momentum like a pendulum, arching lower back.'
  },
  {
    id: 'standing-calf-raise',
    name: 'Standing Calf Raise',
    muscle: 'Calves',
    equipment: 'Machine',
    difficulty: 'Beginner',
    description: 'Targets the gastrocnemius with straight knee extension and loaded plantar flexion.',
    cues: 'Descend to full 2-second deep Achilles stretch, explode onto big toes, pause 1 second at top.',
    common_mistakes: 'Bouncing quickly with Achilles elasticity instead of flexing the muscular belly of calves.'
  }
];
