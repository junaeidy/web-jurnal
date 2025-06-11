<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teams;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TeamsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Teams::orderBy('created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'contact' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            $filename = Str::uuid() . '.' . $request->file('photo')->getClientOriginalExtension();
            $request->file('photo')->storeAs('team_photos', $filename, 'public');
            $data['photo'] = 'storage/team_photos/' . $filename;
        }

        $team = Teams::create($data);

        return response()->json(['success' => true, 'data' => $team], 201);
    }

    public function show(Teams $team)
    {
        return $team;
    }

    public function update(Request $request, Teams $team)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'contact' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            if ($team->photo && Storage::disk('public')->exists(str_replace('storage/', '', $team->photo))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $team->photo));
            }

            $filename = Str::uuid() . '.' . $request->file('photo')->getClientOriginalExtension();
            $request->file('photo')->storeAs('team_photos', $filename, 'public');
            $data['photo'] = 'storage/team_photos/' . $filename;
        }

        $team->update($data);

        return response()->json(['success' => true, 'data' => $team]);
    }

    public function destroy(Teams $team)
    {
        if ($team->photo && Storage::disk('public')->exists(str_replace('storage/', '', $team->photo))) {
            Storage::disk('public')->delete(str_replace('storage/', '', $team->photo));
        }

        $team->delete();

        return response()->json(['success' => true, 'message' => 'Anggota tim dihapus.']);
    }
}
