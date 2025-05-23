<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Barangay;
use App\Models\ChildProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NetisController extends Controller
{
    // public function index(){
    //     $barangays = Barangay::select('id', 'name')->get();
    //     $teachers = Teacher::select('id', 'full_name')->get();

    //     $children = ChildProfile::with(['barangay_data', 'teacher'])->paginate(10);

    //     return Inertia::render('Netis', [
    //         'barangays' => $barangays,
    //         'teachers' => $teachers,
    //         'data' => $children
    //     ]);
    // }

    public function index(Request $request)
{
    $search = $request->input('search');
    $barangay = $request->input('barangay');

    $barangays = Barangay::select('id', 'cdc_name')->get();
    $teachers = Teacher::select('id', 'full_name')->get();

    // Start query builder
    $query = ChildProfile::with(['barangay_data', 'teacher']);

    // Search filter
    if (!empty($search)) {
        $query->where(function ($q) use ($search) {
            $q->where('first_name', 'LIKE', '%' . $search . '%')
              ->orWhere('last_name', 'LIKE', '%' . $search . '%');
        });
    }

    // Barangay filter
    if (!empty($barangay) && $barangay !== 'All') {
        $query->where('barangay_id', $barangay);
    }

    // Paginate after filters
    $children = $query->paginate(10);

    return Inertia::render('Netis', [
        'barangays' => $barangays,
        'teachers' => $teachers,
        'data' => $children,
    ]);
}


// public function store(Request $request)
// {
//     // Validate incoming data
//     $validated = $request->validate([
//         'first_name' => 'required|string',
//         'middle_name' => 'nullable|string',
//         'last_name' => 'required|string',
//         'suffix' => 'nullable|string',
//         'birthdate' => 'required|date',
//         'gender' => 'required|string',
//         'guardian' => 'required|string',
//         'contact_number' => 'required|string',
//         'barangay' => 'required|string',
//         'barangay_id' => 'required|exists:barangays,id',
//         'teacher_id' => 'required|string',
//         'street' => 'nullable|string',
//         'house_number' => 'nullable|string',
//         'child_session' => 'required|string',
//         'profile' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
//     ]);

//      if ($request->teacher_id === "Others") {
//         $teacher = Teacher::create([
//             'full_name' => $request->cdw_specify,
//             'role' => '_',
//         ]);
//         $validated['teacher_id'] = $teacher->id;
//     }

//     if($request->id == null){
//         // Generate child number
//     $latestChildNumber = ChildProfile::where('barangay_id', $validated['barangay_id'])
//                                       ->latest('created_at')
//                                       ->value('child_number');

//     // Determine the next child number
//     $nextNumber = $latestChildNumber ? intval(explode('-', $latestChildNumber)[1]) + 1 : 1;
//     $formattedNumber = str_pad($nextNumber, $nextNumber < 100 ? 2 : 3, '0', STR_PAD_LEFT);

//     // Combine barangay ID and formatted number
//     $validated['child_number'] = $validated['barangay_id'] . '-' . $formattedNumber;

//     // Create child profile
//     ChildProfile::create($validated);
//     } else{
//         $child = ChildProfile::findOrFail($request->id);
//         $child->update($validated);

//     }

//     // Redirect with success message
//    return response()->json([
//     'message'=> 'succes'
//    ],200);

// }


public function store(Request $request)
{
    // Validate incoming data
    $validated = $request->validate([
        'child_number' => 'required|string',
        'first_name' => 'required|string',
        'middle_name' => 'nullable|string',
        'last_name' => 'required|string',
        'suffix' => 'nullable|string',
        'birthdate' => 'required|date',
        'gender' => 'required|string',
        'guardian' => 'required|string',
        'contact_number' => 'required|string',
        'barangay' => 'required|string',
        'barangay_id' => 'required|exists:barangays,id',
        'teacher_id' => 'required|string',
        'street' => 'nullable|string',
        'house_number' => 'nullable|string',
        'child_session' => 'required|string',
        'profile' => 'nullable',
    ]);

    // If "Others" selected for teacher
    if ($request->teacher_id === "Others") {
        $teacher = Teacher::create([
            'full_name' => $request->cdw_specify,
            'role' => '_',
        ]);
        $validated['teacher_id'] = $teacher->id;
    }

      // Handle profile as file or string
    if ($request->hasFile('profile')) {
        $path = $request->file('profile')->store('profiles', 'public');
        $validated['profile'] = '/storage/' . $path;
    } elseif (is_string($request->profile)) {
        $validated['profile'] = $request->profile;
    }

    if ($request->id == null || $request->id == '') {
        // // Generate child number
        // $latestChildNumber = ChildProfile::where('barangay_id', $validated['barangay_id'])
        //                                 ->latest('created_at')
        //                                 ->value('child_number');

        // $nextNumber = $latestChildNumber ? intval(explode('-', $latestChildNumber)[1]) + 1 : 1;
        // $formattedNumber = str_pad($nextNumber, $nextNumber < 100 ? 2 : 3, '0', STR_PAD_LEFT);
        // $validated['child_number'] = $validated['barangay_id'] . '-' . $formattedNumber;

        // Create new profile
        ChildProfile::create($validated);
    } else {
        // Update existing
        $child = ChildProfile::findOrFail($request->id);
        $child->update($validated);
    }

    return response()->json([
        'message' => 'success'
    ], 200);
}


public function destroy($id)
{
    $child = ChildProfile::findOrFail($id);
    $child->delete();

    return Redirect::route('/netis')->with('success', 'Child profile deleted successfully.');
}

}
