"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  Trophy,
  Calendar,
  Target,
  Award,
  Users,
  Clock,
} from "lucide-react";

export default function StatsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [playerProfile, setPlayerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);

      // If player, fetch player profile with achievements
      if (data.user.role === "player") {
        const profileRes = await fetch("/api/players");
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const profile = profileData.players.find(
            (p: any) => p.userId === data.user.id,
          );
          if (profile) {
            setPlayerProfile(profile);
          }
        }
      }
    } catch (error) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900"></div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate real stats from achievements
  const achievements = playerProfile?.achievements || [];
  const approvedAchievements = achievements.filter((a: any) => a.isApproved);
  
  const goldCount = approvedAchievements.filter((a: any) => a.position === "gold").length;
  const silverCount = approvedAchievements.filter((a: any) => a.position === "silver").length;
  const bronzeCount = approvedAchievements.filter((a: any) => a.position === "bronze").length;
  const participationCount = approvedAchievements.filter((a: any) => a.position === "participation").length;
  const totalMedals = goldCount + silverCount + bronzeCount;
  const totalTournaments = approvedAchievements.length;
  
  // Tournament stats
  const tournamentStats = {
    participated: totalTournaments,
    won: goldCount + silverCount + bronzeCount,
    winRate: totalTournaments > 0 ? Math.round(((goldCount + silverCount + bronzeCount) / totalTournaments) * 100) : 0,
    medals: {
      gold: goldCount,
      silver: silverCount,
      bronze: bronzeCount,
    },
  };

  // Training hours - we don't have this data yet, show 0
  const trainingHours = [
    { month: "Jan", hours: 0 },
    { month: "Feb", hours: 0 },
    { month: "Mar", hours: 0 },
    { month: "Apr", hours: 0 },
    { month: "May", hours: 0 },
    { month: "Jun", hours: 0 },
  ];

  // Total training hours (placeholder)
  const totalTrainingHours = trainingHours.reduce((sum, m) => sum + m.hours, 0);

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Performance Statistics
              </h1>
              <p className="text-gray-600 mt-1">
                {playerProfile 
                  ? `Track your tournament performance - ${playerProfile.name}`
                  : "Create a player profile to see your statistics"}
              </p>
            </div>
          </div>
        </div>

        {!playerProfile ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Statistics Available</h3>
            <p className="text-gray-600">
              Create a player profile and add achievements to see your performance statistics.
            </p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Active
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{totalTrainingHours}h</div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Training Hours
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-blue-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{totalTournaments}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {tournamentStats.participated}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tournaments</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-yellow-600 text-sm font-semibold">
                    {tournamentStats.winRate}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {tournamentStats.won}
                </div>
                <div className="text-sm text-gray-600 mt-1">Wins (Medals)</div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-purple-600 text-sm font-semibold">
                    {playerProfile.beltCategory || "N/A"}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 capitalize">
                  {playerProfile.beltCategory?.split(" ")[0] || "Unranked"}
                </div>
                <div className="text-sm text-gray-600 mt-1">Current Rank</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Training Hours Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Training Hours (Last 6 Months)
                </h2>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {trainingHours.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full">
                        <div
                          className="w-full bg-linear-to-t from-gray-900 to-gray-700 rounded-t hover:from-black hover:to-gray-900 transition cursor-pointer"
                          style={{ height: `${Math.max((item.hours / 30) * 200, 4)}px` }}
                          title={`${item.hours} hours`}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-900">
                            {item.hours}h
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  Training tracking coming soon
                </p>
              </div>

              {/* Medal Distribution */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Tournament Medals
                </h2>
                <div className="space-y-6 pt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Gold
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {tournamentStats.medals.gold}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{
                          width: `${totalTournaments > 0 ? (tournamentStats.medals.gold / Math.max(totalTournaments, 1)) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Silver
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {tournamentStats.medals.silver}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gray-400 h-3 rounded-full"
                        style={{
                          width: `${totalTournaments > 0 ? (tournamentStats.medals.silver / Math.max(totalTournaments, 1)) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Bronze
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {tournamentStats.medals.bronze}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-600 h-3 rounded-full"
                        style={{
                          width: `${totalTournaments > 0 ? (tournamentStats.medals.bronze / Math.max(totalTournaments, 1)) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Total Medals
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {totalMedals}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              {achievements.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No achievements yet. Start adding your tournament results!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {achievements.slice(0, 5).map((achievement: any) => (
                    <div key={achievement.id} className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        achievement.position === "gold" ? "bg-yellow-100" :
                        achievement.position === "silver" ? "bg-gray-100" :
                        achievement.position === "bronze" ? "bg-orange-100" :
                        "bg-blue-100"
                      }`}>
                        <Trophy className={`w-5 h-5 ${
                          achievement.position === "gold" ? "text-yellow-600" :
                          achievement.position === "silver" ? "text-gray-600" :
                          achievement.position === "bronze" ? "text-orange-600" :
                          "text-blue-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 capitalize">
                          {achievement.position} - {achievement.tournamentName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {achievement.category}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(achievement.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          {!achievement.isApproved && " (Pending Approval)"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}