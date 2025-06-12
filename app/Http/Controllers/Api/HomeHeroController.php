<?php

namespace App\Http\Controllers\Api;

use App\Models\Journal;
use App\Models\HomeHero;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class HomeHeroController extends Controller
{
    public function show()
    {
        $data = HomeHero::first();
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $data = HomeHero::firstOrCreate([]);

        $validated = $request->validate([
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'cta_text' => 'nullable|string',
            'cta_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old if exists
            if ($data->image && Storage::exists($data->image)) {
                Storage::delete($data->image);
            }
            $path = $request->file('image')->store('home', 'public');
            $validated['image'] = $path;
        }

        $data->update($validated);

        return response()->json(['message' => 'Hero updated successfully', 'data' => $data]);
    }
}
