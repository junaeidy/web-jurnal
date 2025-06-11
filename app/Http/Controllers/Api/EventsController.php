<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventsController extends Controller
{
    public function index()
    {
        return Events::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'related_link' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        $event = Events::create($validated);
        return response()->json($event, 201);
    }

    public function show(Events $event)
    {
        return $event;
    }

    public function update(Request $request, Events $event)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'related_link' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        $event->update($validated);
        return response()->json($event);
    }

    public function destroy(Events $event)
    {
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }
        $event->delete();
        return response()->json(['message' => 'Event deleted']);
    }
}
