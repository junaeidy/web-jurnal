<?php

namespace App\Http\Controllers\Api;

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
            'title_id' => 'required|string',
            'title_en' => 'required|string',
            'subtitle_id' => 'nullable|string',
            'subtitle_en' => 'nullable|string',
            'cta_text_id' => 'nullable|string',
            'cta_text_en' => 'nullable|string',
            'cta_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        $data->title = [
            'id' => $validated['title_id'],
            'en' => $validated['title_en']
        ];
        $data->subtitle = [
            'id' => $validated['subtitle_id'] ?? '',
            'en' => $validated['subtitle_en'] ?? ''
        ];
        $data->cta_text = [
            'id' => $validated['cta_text_id'] ?? '',
            'en' => $validated['cta_text_en'] ?? ''
        ];
        $data->cta_link = $validated['cta_link'] ?? null;

        if ($request->hasFile('image')) {
            if ($data->image && Storage::disk('public')->exists($data->image)) {
                Storage::disk('public')->delete($data->image);
            }
            $path = $request->file('image')->store('home', 'public');
            $data->image = $path;
        }

        $data->save();

        return response()->json([
            'message' => 'Hero updated successfully',
            'data' => $data
        ]);
    }
}
