<?php

namespace App\Http\Controllers;

use App\Models\EmailCampaign;
use App\Models\EmailRecipient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Jobs\SendCampaignEmail;

class EmailCampaignController extends Controller
{
    public function index()
    {
        $campaigns = EmailCampaign::withCount([
            'recipients as success_count' => fn($q) => $q->where('status', 'sent'),
            'recipients as failed_count' => fn($q) => $q->where('status', 'failed'),
        ])->latest()->get();

        return Inertia::render('Admin/Campaigns/Index', [
            'campaigns' => $campaigns
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'subject'   => 'required|string|max:255',
            'content'   => 'required|string',
            'emails'    => 'required|array|min:1',
            'emails.*'  => 'required|email',
        ]);

        // Simpan campaign
        $campaign = EmailCampaign::create([
            'name'    => $request->name,
            'subject' => $request->subject,
            'content' => $request->content,
        ]);

        foreach ($request->emails as $email) {
            // Buat penerima dengan status pending
            $recipient = EmailRecipient::create([
                'email_campaign_id' => $campaign->id,
                'email'             => $email,
                'status'            => 'pending',
            ]);

            SendCampaignEmail::dispatch($recipient);
        }

        return redirect()->route('campaigns.index')->with('success', 'Campaign berhasil dibuat & email dikirim!');
    }

    public function show($id)
    {
        $campaign = EmailCampaign::with(['recipients'])->findOrFail($id);

        return Inertia::render('Admin/Campaigns/Show', [
            'campaign' => $campaign,
        ]);
    }
}
