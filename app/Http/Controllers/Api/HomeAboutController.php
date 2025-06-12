<?php

namespace App\Http\Controllers\Api;

use App\Models\HomeAbout;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class HomeAboutController extends Controller
{
    public function show()
    {
        $about = HomeAbout::first();
        return response()->json($about);
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'google_form_link' => 'nullable|url',
            'whatsapp_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        $about = HomeAbout::firstOrNew(['id' => 1]);

        $about->title = $request->title;
        $about->content = $request->content;
        $about->google_form_link = $request->google_form_link;
        $about->whatsapp_link = $request->whatsapp_link;

        if ($request->hasFile('image')) {
            if ($about->image && Storage::disk('public')->exists($about->image)) {
                Storage::disk('public')->delete($about->image);
            }
            $about->image = $request->file('image')->store('about', 'public');
        }

        $about->save();

        return response()->json(['message' => 'About section updated successfully']);
    }
}
