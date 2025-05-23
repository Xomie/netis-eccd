<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Barangay;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index(){
        return Inertia::render('Settings',[
            'teachers' => Teacher::all(),
            'barangays' => Barangay::all(),
        ]);
    }

    public function storeTeacher(Request $request)
{
    $request->validate([
        'full_name' => 'required|string|max:255',
        'role' => 'required|string|max:255',
        'id' => 'nullable|exists:teachers,id',
    ]);

    if ($request->filled('id')) {
        // Update existing teacher
        $teacher = Teacher::findOrFail($request->id);
        $teacher->update($request->only(['full_name', 'role']));
        return response()->json($teacher, 200);
    } else {
        // Create new teacher
        $teacher = Teacher::create($request->only(['full_name', 'role']));
        return response()->json($teacher, 201);
    }
}


public function storeBarangay(Request $request)
{
    $request->validate([
        'id' => 'nullable|exists:barangays,id',
        'name' => 'required|string|max:255',
        'address' => 'required|string|max:255',
        'barangay_captain' => 'required|string|max:255',
        'cdc_name' => 'required|string|max:255',
        'logo' => 'nullable', // Can be file or string
    ]);

    $logoPath = null;

    // If file is uploaded
    if ($request->hasFile('logo')) {
        $path = $request->file('logo')->store('logos', 'public');
        $logoPath = asset("/storage/{$path}");
    } elseif (is_string($request->logo)) {
        $logoPath = $request->logo; // existing URL
    }

    if ($request->filled('id')) {
        // Update
        $barangay = Barangay::findOrFail($request->id);
        $barangay->update([
            'name' => $request->name,
            'address' => $request->address,
            'barangay_captain' => $request->barangay_captain,
            'cdc_name' => $request->cdc_name,
            'logo' => $logoPath ?? $barangay->logo,
        ]);
        return response()->json($barangay, 200);
    } else {
        // Create
        $barangay = Barangay::create([
            'name' => $request->name,
            'address' => $request->address,
            'barangay_captain' => $request->barangay_captain,
            'cdc_name' => $request->cdc_name,
            'logo' => $logoPath,
        ]);
        return response()->json($barangay, 201);
    }
}


public function destroyBarangay($id)
{
    $barangay = Barangay::find($id);

    if (!$barangay) {
        return response()->json(['message' => 'Barangay not found'], 404);
    }

    $barangay->delete();

    return response()->json(['message' => 'Barangay deleted successfully'], 200);
}

public function destroyTeacher($id)
{
    $teacher = Teacher::find($id);

    if (!$teacher) {
        return response()->json(['message' => 'Teacher not found'], 404);
    }

    $teacher->delete();

    return response()->json(['message' => 'Teacher deleted successfully'], 200);
}


}
