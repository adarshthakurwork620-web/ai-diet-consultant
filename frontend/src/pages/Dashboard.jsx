import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../api'

const presetOptions = [
  { label: 'Drink 3 Liters Water', target: 'Daily hydration boost', goal_type: 'Water' },
  { label: 'Walk 8,000 Steps', target: 'Move your body today', goal_type: 'Steps' },
  { label: 'Eat under 2000 Calories', target: 'Stay within calorie budget', goal_type: 'Calories' },
  { label: 'Exercise 30 Minutes', target: 'Active cardio or strength', goal_type: 'Exercise' },
  { label: 'Sleep 8 Hours', target: 'Quality rest for recovery', goal_type: 'Sleep' },
  { label: 'Avoid Junk Food', target: 'Choose whole foods all day', goal_type: 'Nutrition' },
]

const card = {
  background: 'rgba(255,255,255,0.05)',
  border: '0.5px solid rgba(255,255,255,0.1)',
  borderRadius: 18,
  padding: 20,
}

function Dashboard() {
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem('user')) || { name: 'Siddh Jain', goal: 'Maintain' }
  const token = localStorage.getItem('token')

  const [goals, setGoals] = useState([])
  const [summary, setSummary] = useState({ total_goals: 0, completed_goals: 0, progress_pct: 0, streak_days: 0, weekly_summary: [], monthly_consistency: 0, quote: 'Keep building healthy habits every day.', suggested_goals: [], history: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', target: '', goal_type: 'Custom' })
  const [editingGoalId, setEditingGoalId] = useState(null)
  const [editingGoal, setEditingGoal] = useState({ title: '', target: '', goal_type: 'Custom' })

  const fetchDashboard = async () => {
    if (!token) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE}/api/goals`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      if (response.ok) {
        setGoals(data.goals || [])
        setSummary(data.summary || summary)
      } else {
        setError(data.error || 'Could not load goals yet.')
      }
    } catch (err) {
      console.error(err)
      setError('Unable to connect to the server. Please try again.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchDashboard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormChange = (field, value) => {
    setNewGoal(prev => ({ ...prev, [field]: value }))
  }

  const handleEditingChange = (field, value) => {
    setEditingGoal(prev => ({ ...prev, [field]: value }))
  }

  const saveGoal = async () => {
    if (!newGoal.title.trim()) {
      setError('Goal title can not be empty.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newGoal),
      })
      const data = await response.json()
      if (response.ok) {
        setNewGoal({ title: '', target: '', goal_type: 'Custom' })
        setShowAdd(false)
        fetchDashboard()
      } else {
        setError(data.error || 'Unable to add a new goal.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong adding the goal.')
    }
    setLoading(false)
  }

  const updateGoal = async (goalId) => {
    if (!editingGoal.title.trim()) {
      setError('Goal title can not be empty.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/goals/${goalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingGoal),
      })
      const data = await response.json()
      if (response.ok) {
        setEditingGoalId(null)
        fetchDashboard()
      } else {
        setError(data.error || 'Unable to update the goal.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong saving changes.')
    }
    setLoading(false)
  }

  const toggleGoal = async (goalId) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/goals/${goalId}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        fetchDashboard()
      } else {
        setError(data.error || 'Unable to update goal status.')
      }
    } catch (err) {
      console.error(err)
      setError('Could not update goal status.')
    }
    setLoading(false)
  }

  const removeGoal = async (goalId) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        fetchDashboard()
      } else {
        setError(data.error || 'Could not delete goal.')
      }
    } catch (err) {
      console.error(err)
      setError('Could not delete goal.')
    }
    setLoading(false)
  }

  const beginEdit = (goal) => {
    setEditingGoalId(goal.id)
    setEditingGoal({ title: goal.title, target: goal.target, goal_type: goal.goal_type })
  }

  const selectSuggestion = (suggestion) => {
    setNewGoal({ title: suggestion.title, target: suggestion.target, goal_type: suggestion.goal_type || 'Custom' })
    setShowAdd(true)
  }

  return (
    <div style={{ background: '#07080f', minHeight: '100vh', color: '#f7f8fb', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <nav style={{ background: 'rgba(8,10,18,0.96)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <div style={{ width: 30, height: 30, borderRadius: 12, background: 'linear-gradient(135deg, #22c55e, #14b8a6)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700 }}>N</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>NutriAI Dashboard</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Smart daily goals tracker</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[['Dashboard', '/dashboard'], ['Meal Plan', '/mealplan'], ['AI Chat', '/consultation']].map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)} style={{ border: 'none', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: path === '/dashboard' ? '#22c55e' : '#94a3b8', background: path === '/dashboard' ? 'rgba(34,197,94,0.12)' : 'transparent', cursor: 'pointer' }}>{label}</button>
          ))}
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(34,197,94,0.16)', display: 'grid', placeItems: 'center', color: '#a7f3d0', fontWeight: 700 }}>{storedUser.name?.charAt(0) || 'U'}</div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 18 }}>
          <div style={{ flex: '1 1 320px', minWidth: 260 }}>
            <h1 style={{ fontSize: 28, margin: 0, fontWeight: 700 }}>Good morning, {storedUser.name} 👋</h1>
            <p style={{ color: '#94a3b8', marginTop: 8, lineHeight: 1.6 }}>Your daily goals are now tracked automatically, with smart suggestions and progress history to keep you motivated.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ ...card, minWidth: 180, flex: '1 1 180px' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Today’s Goals</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{summary.completed_goals}/{summary.total_goals}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Completed</div>
            </div>
            <div style={{ ...card, minWidth: 180, flex: '1 1 180px' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Progress</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: summary.progress_pct > 60 ? '#22c55e' : '#facc15' }}>{summary.progress_pct}%</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Goal completion</div>
            </div>
            <div style={{ ...card, minWidth: 180, flex: '1 1 180px' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Streak</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#4ade80' }}>{summary.streak_days} days</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Consistency streak</div>
            </div>
            <div style={{ ...card, minWidth: 180, flex: '1 1 180px' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Consistency</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#60a5fa' }}>{summary.monthly_consistency}%</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>This month</div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ ...card, background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.18)', color: '#fecaca', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 20 }}>
          <div style={{ ...card, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Today’s Goals</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>Checklist & actions</div>
              </div>
              <button onClick={() => setShowAdd(prev => !prev)} style={{ background: 'rgba(34,197,94,0.15)', border: 'none', borderRadius: 999, color: '#d1fae5', padding: '10px 16px', cursor: 'pointer', fontWeight: 600 }}>+ Add Goal</button>
            </div>

            {showAdd && (
              <div style={{ marginBottom: 18, padding: 18, borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'grid', gap: 12, marginBottom: 12 }}>
                  <input
                    value={newGoal.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="Goal title"
                    style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#f8fafc', padding: '12px 14px', fontSize: 13 }}
                  />
                  <input
                    value={newGoal.target}
                    onChange={(e) => handleFormChange('target', e.target.value)}
                    placeholder="Goal details (e.g. 3 liters water)"
                    style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#f8fafc', padding: '12px 14px', fontSize: 13 }}
                  />
                  <select
                    value={newGoal.goal_type}
                    onChange={(e) => handleFormChange('goal_type', e.target.value)}
                    style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#f8fafc', padding: '12px 14px', fontSize: 13 }}
                  >
                    <option value="Custom">Custom Goal</option>
                    <option value="Water">Water</option>
                    <option value="Steps">Steps</option>
                    <option value="Calories">Calories</option>
                    <option value="Exercise">Exercise</option>
                    <option value="Sleep">Sleep</option>
                    <option value="Nutrition">Nutrition</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button onClick={saveGoal} style={{ flex: '1 1 120px', background: '#22c55e', border: 'none', color: '#fff', padding: '12px 16px', borderRadius: 14, fontWeight: 600, cursor: 'pointer' }}>Save Goal</button>
                  <button onClick={() => setShowAdd(false)} style={{ flex: '1 1 120px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#cbd5e1', padding: '12px 16px', borderRadius: 14, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gap: 14 }}>
              {goals.length === 0 && (
                <div style={{ color: '#94a3b8', fontSize: 13, padding: '22px 0' }}>No goals found yet — add your first daily target and track it instantly.</div>
              )}
              {goals.map((goal) => (
                <div key={goal.id} style={{ display: 'grid', gap: 12, padding: 16, borderRadius: 18, background: goal.completed ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)', border: goal.completed ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(255,255,255,0.08)' }}>
                  {editingGoalId === goal.id ? (
                    <div style={{ display: 'grid', gap: 10 }}>
                      <input value={editingGoal.title} onChange={(e) => handleEditingChange('title', e.target.value)} style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', padding: '10px 12px', fontSize: 13 }} />
                      <input value={editingGoal.target} onChange={(e) => handleEditingChange('target', e.target.value)} style={{ width: '100%', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', padding: '10px 12px', fontSize: 13 }} />
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button onClick={() => updateGoal(goal.id)} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 14, cursor: 'pointer' }}>Save</button>
                        <button onClick={() => setEditingGoalId(null)} style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.14)', padding: '10px 16px', borderRadius: 14, cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center', minWidth: 0 }}>
                        <button onClick={() => toggleGoal(goal.id)} style={{ width: 42, height: 42, borderRadius: 14, border: 'none', color: '#fff', background: goal.completed ? '#22c55e' : 'rgba(255,255,255,0.08)', fontSize: 18, cursor: 'pointer' }}>{goal.completed ? '✓' : '⏳'}</button>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{goal.title}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{goal.target || 'Daily health goal'}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button onClick={() => beginEdit(goal)} style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: 14, background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '10px 14px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => removeGoal(goal.id)} style={{ border: '1px solid rgba(248,113,113,0.25)', borderRadius: 14, background: 'rgba(248,113,113,0.12)', color: '#fecaca', padding: '10px 14px', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {summary.suggested_goals?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Smart recommendations</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
                  {summary.suggested_goals.map((item, index) => (
                    <button key={index} onClick={() => selectSuggestion(item)} style={{ textAlign: 'left', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#e2e8f0', padding: '14px', cursor: 'pointer' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{item.target}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ ...card, position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Goal Progress</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 150, height: 150, borderRadius: '50%', background: `conic-gradient(#22c55e ${summary.progress_pct}%, rgba(255,255,255,0.08) ${summary.progress_pct}% 100%)`, display: 'grid', placeItems: 'center' }}>
                  <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#07080f', display: 'grid', placeItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc' }}>{summary.progress_pct}%</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Complete</div>
                    </div>
                  </div>
                </div>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Today’s momentum</div>
                  <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.75 }}>{summary.quote}</div>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
                  {summary.weekly_summary.map((item, index) => (
                    <div key={index} style={{ padding: '10px 0', borderRadius: 14, textAlign: 'center', fontSize: 11, color: item.completed ? '#f0fdf4' : '#94a3b8', background: item.completed ? '#16a34a' : 'rgba(255,255,255,0.06)' }}>
                      {item.day}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, fontSize: 12, color: '#94a3b8' }}>Weekly summary — filled squares mean all active goals were completed.</div>
              </div>
            </div>

            <div style={{ ...card, background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(15,23,42,0.95))' }}>
              <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Motivation</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f8fafc' }}>Stay consistent. Stay strong.</div>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.8 }}>You are building a healthier daily routine, one smart goal at a time. Keep tracking, and let your streak become your new normal.</p>
              <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 14, background: 'rgba(34,197,94,0.2)', display: 'grid', placeItems: 'center', color: '#a7f3d0', fontWeight: 700 }}>🔥</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>Weekly confidence</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{summary.monthly_consistency}% consistency this month.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 14, background: 'rgba(96,165,250,0.18)', display: 'grid', placeItems: 'center', color: '#bfdbfe', fontWeight: 700 }}>💡</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>Smart reminders</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Review your goal checklist each morning for higher completion rate.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ ...card, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Goal History</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>Recent completed goals</div>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{summary.history.length} completed items</div>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {summary.history.length === 0 ? (
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Your daily history will appear here once you complete goals. Keep going!</div>
              ) : (
                summary.history.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 16px', borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc' }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{item.target}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.goal_type}</div>
                      <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, marginTop: 4 }}>{item.date}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
