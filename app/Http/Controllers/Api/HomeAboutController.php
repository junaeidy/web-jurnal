<?php

namespace App\Http\Controllers\Api;

use App\Models\HomeAbout;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class HomeAboutController extends Controller
{
    public function index()
    {
        $abouts = HomeAbout::all();
        return response()->json($abouts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'google_form_link' => 'nullable|url',
            'whatsapp_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        $about = new HomeAbout();
        $about->title = $request->title;
        $about->content = $request->content;
        $about->google_form_link = $request->google_form_link;
        $about->whatsapp_link = $request->whatsapp_link;

        if ($request->hasFile('image')) {
            $about->image = $request->file('image')->store('about', 'public');
        }

        $about->save();

        return response()->json(['message' => 'Data berhasil ditambahkan', 'data' => $about], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'google_form_link' => 'nullable|url',
            'whatsapp_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
        ]);

        $about = HomeAbout::findOrFail($id);

        $about->title = $request->title ?? $about->title;
        $about->content = $request->content ?? $about->content;
        $about->google_form_link = $request->google_form_link ?? $about->google_form_link;
        $about->whatsapp_link = $request->whatsapp_link ?? $about->whatsapp_link;

        if ($request->hasFile('image')) {
            if ($about->image && Storage::disk('public')->exists($about->image)) {
                Storage::disk('public')->delete($about->image);
            }
            $about->image = $request->file('image')->store('about', 'public');
        }

        $about->save();

        return response()->json(['message' => 'Data berhasil diperbarui', 'data' => $about]);
    }

    public function destroy($id)
    {
        $about = HomeAbout::findOrFail($id);

        if ($about->image && Storage::disk('public')->exists($about->image)) {
            Storage::disk('public')->delete($about->image);
        }

        $about->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
