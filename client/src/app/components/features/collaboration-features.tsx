"use client"

import { Users, MessageSquare, Bell, Shield, Check } from "lucide-react"

export default function CollaborationFeatures() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-green-300 border-2 border-black font-black text-sm tracking-wider">
              COLLABORATION
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            EVERYONE ON THE
            <br />
            SAME PAGE
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bring your entire production team together. Assign roles, manage permissions, and keep everyone synchronized throughout pre-production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Management */}
          <div
            className="border-4 border-black bg-white p-10"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="w-14 h-14 bg-green-400 border-3 border-black rounded-full flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl mb-4 leading-tight">
                TEAM MANAGEMENT
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Add unlimited team members to your production. Assign roles like Director, Producer, Cinematographer, and more. Everyone has access to the information they need.
            </p>

            <div className="bg-gray-50 border-3 border-gray-300 p-6 rounded-lg mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-400 border-2 border-black rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">John Director</div>
                    <div className="text-sm text-gray-600">Director</div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-300 border-2 border-black text-xs font-bold">ADMIN</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-400 border-2 border-black rounded-full flex items-center justify-center text-white font-bold">
                    SP
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Sarah Producer</div>
                    <div className="text-sm text-gray-600">Producer</div>
                  </div>
                  <span className="px-3 py-1 bg-green-300 border-2 border-black text-xs font-bold">EDITOR</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-400 border-2 border-black rounded-full flex items-center justify-center text-white font-bold">
                    MC
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Mike Cinematographer</div>
                    <div className="text-sm text-gray-600">DP</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-300 border-2 border-black text-xs font-bold">VIEWER</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Unlimited team members</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Custom role assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Availability tracking</span>
              </div>
            </div>
          </div>

          {/* Permissions & Access */}
          <div
            className="border-4 border-black bg-white p-10"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="w-14 h-14 bg-red-400 border-3 border-black rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl mb-4 leading-tight">
                ROLE-BASED PERMISSIONS
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Control who can view, edit, or manage different aspects of your production. Keep sensitive information secure while ensuring collaboration.
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 border-3 border-yellow-300 p-4 rounded-lg">
                <div className="font-black mb-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-yellow-300 border-2 border-black text-xs">ADMIN</span>
                  Full Access
                </div>
                <p className="text-sm text-gray-600">Can manage everything including team, budget, and settings</p>
              </div>

              <div className="bg-green-50 border-3 border-green-300 p-4 rounded-lg">
                <div className="font-black mb-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-300 border-2 border-black text-xs">EDITOR</span>
                  Edit Access
                </div>
                <p className="text-sm text-gray-600">Can edit schedules, storyboards, and production documents</p>
              </div>

              <div className="bg-blue-50 border-3 border-blue-300 p-4 rounded-lg">
                <div className="font-black mb-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-300 border-2 border-black text-xs">VIEWER</span>
                  View Only
                </div>
                <p className="text-sm text-gray-600">Can view schedules and receive updates</p>
              </div>
            </div>
          </div>

          {/* Real-time Updates */}
          <div
            className="border-4 border-black bg-white p-10"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="w-14 h-14 bg-blue-400 border-3 border-black rounded-full flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl mb-4 leading-tight">
                REAL-TIME NOTIFICATIONS
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Keep your team informed with instant notifications. Get alerts for schedule changes, new assignments, updates, and important deadlines.
            </p>

            <div className="bg-gray-50 border-3 border-gray-300 p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white border-2 border-gray-300 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-bold text-sm">Schedule Updated</div>
                  <div className="text-xs text-gray-600">Call time changed to 7:00 AM</div>
                </div>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border-2 border-gray-300 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-bold text-sm">New Location Added</div>
                  <div className="text-xs text-gray-600">Central Park confirmed</div>
                </div>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white border-2 border-gray-300 rounded">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-bold text-sm">Task Assigned</div>
                  <div className="text-xs text-gray-600">Review storyboard for Scene 5</div>
                </div>
                <span className="text-xs text-gray-500">3h ago</span>
              </div>
            </div>
          </div>

          {/* Team Communication */}
          <div
            className="border-4 border-black bg-white p-10"
            style={{
              boxShadow: "6px 6px 0px rgba(0,0,0,1)",
            }}
          >
            <div className="mb-6">
              <div className="w-14 h-14 bg-purple-400 border-3 border-black rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-7 h-7 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-black text-3xl mb-4 leading-tight">
                BUILT-IN MESSAGING
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Discuss scenes, share feedback, and coordinate with your team—all within Frameboard. No need to switch between apps.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Production-wide announcements</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Scene-specific discussions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">Direct messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                <span className="font-semibold">File sharing & attachments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
