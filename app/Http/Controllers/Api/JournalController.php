<?php

namespace App\Http\Controllers\Api;

use App\Models\Journal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $query = Journal::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title->id', 'like', "%{$search}%")
                    ->orWhere('title->en', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        $sortField = 'title->id';
        $sortDirection = 'asc';

        if ($request->filled('sort')) {
            $sort = $request->sort;
            if (str_starts_with($sort, '-')) {
                $sortField = ltrim($sort, '-');
                $sortDirection = 'desc';
            } else {
                $sortField = $sort;
            }

            $allowedSorts = ['title->id', 'impact_factor', 'acceptance_rate'];
            if (in_array($sortField, $allowedSorts)) {
                $query->orderByRaw("$sortField $sortDirection");
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $request->get('limit', 15);
        $journals = $query->paginate($perPage);

        return response()->json($journals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'link' => 'required|url',
            'acceptance_rate' => 'nullable|numeric|between:0,100',
            'decision_days' => 'nullable|integer',
            'impact_factor' => 'nullable|numeric',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'published_year' => 'nullable|digits:4|integer|min:1900|max:' . date('Y'),
        ]);

        if ($request->hasFile('cover')) {
            $filename = Str::uuid() . '.' . $request->file('cover')->getClientOriginalExtension();
            $request->file('cover')->storeAs('covers', $filename, 'public');
            $validated['cover'] = 'storage/covers/' . $filename;
        }

        $validated['title'] = [
            'id' => $validated['title_id'],
            'en' => $validated['title_en'],
        ];

        $validated['description'] = [
            'id' => $validated['description_id'],
            'en' => $validated['description_en'],
        ];

        unset($validated['title_id'], $validated['title_en'], $validated['description_id'], $validated['description_en']);

        $validated['is_featured'] = $request->boolean('is_featured', false);

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
            'title_id' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_id' => 'required|string',
            'description_en' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'link' => 'required|url',
            'acceptance_rate' => 'nullable|numeric|between:0,100',
            'decision_days' => 'nullable|integer',
            'impact_factor' => 'nullable|numeric',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'category_id' => 'nullable|exists:categories,id',
            'published_year' => 'nullable|digits:4|integer|min:1900|max:' . date('Y'),
        ]);

        if ($request->hasFile('cover')) {
            if ($journal->cover && Storage::disk('public')->exists(str_replace('storage/', '', $journal->cover))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $journal->cover));
            }

            $filename = Str::uuid() . '.' . $request->file('cover')->getClientOriginalExtension();
            $request->file('cover')->storeAs('covers', $filename, 'public');
            $validated['cover'] = 'storage/covers/' . $filename;
        }

        $validated['title'] = [
            'id' => $validated['title_id'],
            'en' => $validated['title_en'],
        ];

        $validated['description'] = [
            'id' => $validated['description_id'],
            'en' => $validated['description_en'],
        ];

        unset($validated['title_id'], $validated['title_en'], $validated['description_id'], $validated['description_en']);

        $validated['is_featured'] = $request->boolean('is_featured', false);

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
        return Journal::where('is_featured', true)
            ->select('id', 'title', 'description', 'link', 'cover', 'acceptance_rate', 'decision_days', 'impact_factor', 'published_year')
            ->get();
    }
}
