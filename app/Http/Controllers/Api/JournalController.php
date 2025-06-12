<?php

namespace App\Http\Controllers\Api;

use App\Models\Journal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Journal::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'required|string',
            'link' => 'required|url',
            'acceptance_rate' => 'nullable|numeric|between:0,100',
            'decision_days' => 'nullable|integer',
            'impact_factor' => 'nullable|numeric',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('cover')) {
            $filename = Str::uuid() . '.' . $request->file('cover')->getClientOriginalExtension();

            $request->file('cover')->storeAs('covers', $filename, 'public');

            $validated['cover'] = 'storage/covers/' . $filename;
        }

        $journal = Journal::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Jurnal berhasil ditambahkan.',
            'data' => $journal
        ], 201);
    }


    public function show(Journal $journal)
    {
        return $journal;
    }

    public function update(Request $request, Journal $journal)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'required|string',
            'link' => 'required|url',
            'acceptance_rate' => 'nullable|numeric|between:0,100',
            'decision_days' => 'nullable|integer',
            'impact_factor' => 'nullable|numeric',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('cover')) {
            if ($journal->cover && Storage::disk('public')->exists(str_replace('storage/', '', $journal->cover))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $journal->cover));
            }

            $filename = Str::uuid() . '.' . $request->file('cover')->getClientOriginalExtension();
            $request->file('cover')->storeAs('covers', $filename, 'public');

            $validated['cover'] = 'storage/covers/' . $filename;
        }

        $journal->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Jurnal berhasil diupdate.',
            'data' => $journal
        ]);
    }

    public function activeJournals()
    {
       return Journal::where('is_active', true)
        ->select('id', 'title', 'cover')
        ->get();
    }

    public function featuredJournals()
    {
        return Journal::where('is_featured', true)->select('id', 'title')->get();
    }

    public function updateFeaturedJournals(Request $request)
    {
        $ids = $request->journal_ids ?? [];

        Journal::query()->update(['is_featured' => false]);

        Journal::whereIn('id', $ids)->update(['is_featured' => true]);

        return response()->json(['message' => 'Updated successfully']);
    }


    public function destroy(Journal $journal)
    {
        if ($journal->cover) {
            $path = str_replace('storage/', '', $journal->cover);
            Storage::disk('public')->delete($path);
        }

        $journal->delete();

        return response()->json([
            'success' => true,
            'message' => 'Jurnal berhasil dihapus.'
        ], 204);
    }

    public function active()
    {
        return Journal::where('is_active', true)->get();
    }
}
